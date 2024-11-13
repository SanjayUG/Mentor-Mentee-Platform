import mongoose from 'mongoose';
import Message from "../models/Message.js";
import User from "../models/User.js";

// Controller to send a message
export const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id;

  try {
    // Check if both sender and receiver exist
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found" });
    }

    // Create the message
    const message = new Message({
      senderId,
      receiverId,
      content,
    });
    await message.save();

    res.status(201).json({ message: "Message sent successfully", data: message });
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
};

// Controller to retrieve the conversation between two users
export const getConversation = async (req, res) => {
  const userId1 = req.user.id;
  const userId2 = req.params.userId;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    }).sort({ createdAt: 1 }); // Sort by timestamp in ascending order

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving conversation", error });
  }
};

// Controller to mark a message as read
export const markMessageAsRead = async (req, res) => {
    const messageId = req.params.id;
  
    // Log the incoming messageId for debugging
    console.log("Received messageId: ", messageId);
  
    // Check if messageId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({ message: "Invalid message ID format" });
    }
  
    try {
      // Log the query to ensure we are looking up the right message
      console.log("Finding message with id:", messageId);
  
      const message = await Message.findById(messageId);
  
      if (!message) {
        // Log if no message is found
        console.log("Message not found in the database.");
        return res.status(404).json({ message: "Message not found" });
      }
  
      // Mark the message as read
      message.read = true;
      await message.save();
  
      // Log success and return the updated message
      console.log("Message marked as read:", message);
      res.status(200).json({ message: "Message marked as read", data: message });
    } catch (error) {
      // Log the error if one occurs
      console.error("Error marking message as read: ", error);
      res.status(500).json({ message: "Error marking message as read", error });
    }
};
  

