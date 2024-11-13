import mongoose from "mongoose";
import Progress from "../models/Progress.js";

// Create Progress
export const createProgress = async (req, res) => {
  const { menteeId, subject, score, totalScore } = req.body;

  try {
    const percentage = (score / totalScore) * 100;

    const progress = new Progress({
      menteeId,
      subject,
      score,
      totalScore,
      percentage,
    });

    await progress.save();

    res.status(201).json({
      message: "Progress uploaded successfully",
      progress,
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading progress", error });
  }
};

// Get Progress by Mentee ID
export const getProgress = async (req, res) => {
    const { menteeId } = req.params;
  
    // Check if menteeId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(menteeId)) {
      return res.status(400).json({ message: "Invalid mentee ID format" });
    }
  
    try {
      const progressData = await Progress.find({ menteeId });
  
      if (!progressData || progressData.length === 0) {
        return res.status(404).json({ message: "No progress data found for this mentee" });
      }
  
      res.status(200).json({ progress: progressData });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving progress", error });
    }
};