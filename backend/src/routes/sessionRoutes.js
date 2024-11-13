import express from "express";
import { scheduleSession, getSessionsByMentor, getSessionsByMentee, updateSessionStatus } from "../controllers/sessionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to schedule a session
router.post("/schedule", authMiddleware, scheduleSession);

// Route to get all sessions of a mentor
router.get("/mentor/:mentorId", authMiddleware, getSessionsByMentor);

// Route to get all sessions of a mentee
router.get("/mentee/:menteeId", authMiddleware, getSessionsByMentee);

// Route to update session status (e.g., 'completed', 'cancelled')
router.patch("/:id/status", authMiddleware, updateSessionStatus);

export { router };
