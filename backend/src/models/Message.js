import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (sender)
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (receiver)
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Optionally, you can add methods to retrieve unread messages or mark messages as read
messageSchema.methods.markAsRead = async function () {
  this.read = true;
  await this.save();
};

const Message = mongoose.model('Message', messageSchema);

export default Message;
