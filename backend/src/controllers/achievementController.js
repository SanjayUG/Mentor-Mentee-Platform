import User from '../models/User.js';
import Achievement from "../models/Achievement.js";

export const createAchievement = async (req, res) => {
  const { title, description, menteeId } = req.body;

  try {
    const achievement = new Achievement({
      title,
      description,
      menteeId,
    });

    await achievement.save();

    res.status(201).json({
      message: "Achievement uploaded successfully",
      achievement,
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading achievement", error });
  }
};

export const getAchievements = async (req, res) => {
  const { menteeId } = req.params;
  const mentorId = req.user._id;

  try {

    // Check if the requesting user is a mentor
    const mentor = await User.findById(mentorId);
    if (mentor.role !== "mentor") {
      return res.status(403).json({ message: "Only mentors can view achievements" });
    }

    // Ensure that the mentee exists and has the specified mentorId
    const mentee = await User.findOne({ _id: menteeId, mentorId });
    if (!mentee) {
      console.log("Mentee not found or unauthorized access");
      return res.status(403).json({ message: "Unauthorized to view this mentee's achievements" });
    }

    // Retrieve achievements for the specified menteeId
    const achievements = await Achievement.find({ menteeId });

    res.status(200).json({ achievements });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ message: "Error fetching achievements", error: error.message || error });
  }
};


