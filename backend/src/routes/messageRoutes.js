import express from "express";
import { sendMessage, getConversation, markMessageAsRead } from "../controllers/messageController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to send a message
router.post("/", authMiddleware, sendMessage);

// Route to get a conversation between the logged-in user and another user
router.get("/conversations/:userId", authMiddleware, getConversation);

// Route to mark a message as read
router.patch("/:id/read", authMiddleware, markMessageAsRead);

export { router };
