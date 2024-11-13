import express from "express";
import { createAchievement, getAchievements } from "../controllers/achievementController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST route for creating a new achievement
router.post("/", authMiddleware, createAchievement);

// Route to get achievements for a specific mentee
router.get('/:menteeId', authMiddleware, getAchievements);

export { router };
