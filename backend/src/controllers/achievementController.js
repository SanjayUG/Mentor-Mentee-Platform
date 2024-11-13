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

  try {
    const mentorId = req.user._id;

    // Verify the mentor-mentee relationship
    const mentee = await User.findOne({ _id: menteeId, mentorId });

    if (!mentee) {
      return res.status(403).json({ message: "Unauthorized to view this mentee's achievements" });
    }

    const achievements = await Achievement.find({ menteeId });

    res.status(200).json({ achievements });
  } catch (error) {
    res.status(500).json({ message: "Error fetching achievements", error });
  }
};