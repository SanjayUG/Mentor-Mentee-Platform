import express from "express";
import { createAchievement } from "../controllers/achievementController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST route for creating a new achievement
router.post("/", authMiddleware, createAchievement);

export { router };
