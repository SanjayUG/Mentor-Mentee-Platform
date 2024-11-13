import express from "express";
import { createProgress, getProgress } from "../controllers/progressController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST route for creating progress
router.post("/", authMiddleware, createProgress);

// GET route for fetching progress for a specific mentee
router.get("/:menteeId", authMiddleware, getProgress);

export { router };
