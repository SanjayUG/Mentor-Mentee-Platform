import Session from "../models/Session.js";
import User from "../models/User.js";

// Controller to schedule a session
export const scheduleSession = async (req, res) => {
  const { menteeId, date, time } = req.body;
  const mentorId = req.user.id; // Getting mentor's ID from the authenticated user

  try {
    // Ensure mentor and mentee exist
    const mentor = await User.findById(mentorId);
    const mentee = await User.findById(menteeId);

    if (!mentor || !mentee) {
      return res.status(404).json({ message: "Mentor or mentee not found" });
    }

    // Check if the mentor is allowed to schedule for this mentee
    if (mentor.role !== "mentor") {
      return res.status(403).json({ message: "Only mentors can schedule sessions" });
    }

    // Create the session
    const session = new Session({
      mentorId,
      menteeId,
      date,
      time,
      status: "scheduled", // Default status is scheduled
    });

    await session.save();
    res.status(201).json({ message: "Session scheduled successfully", session });
  } catch (error) {
    console.error("Error scheduling session:", error); // Log full error to console
    res.status(500).json({ message: "Error scheduling session", error: error.message || error });
  }
};

// Controller to get all sessions of a specific mentor
export const getSessionsByMentor = async (req, res) => {
  const mentorId = req.params.mentorId;

  try {
    const sessions = await Session.find({ mentorId });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving sessions", error });
  }
};

// Controller to get all sessions of a specific mentee
export const getSessionsByMentee = async (req, res) => {
  const menteeId = req.params.menteeId;

  try {
    const sessions = await Session.find({ menteeId });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving sessions", error });
  }
};

// Controller to update the session status
export const updateSessionStatus = async (req, res) => {
  const sessionId = req.params.id;
  const { status } = req.body;

  try {
    // Validate session status
    if (!["scheduled", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Update session status
    session.status = status;
    await session.save();

    res.status(200).json({ message: "Session status updated", session });
  } catch (error) {
    res.status(500).json({ message: "Error updating session status", error });
  }
};
