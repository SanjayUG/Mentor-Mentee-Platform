import express from "express";
import { getAllUsers, getUserById, updateUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizationMiddleware } from "../middleware/authorizationMiddleware.js";

const router = express.Router();

// Route to get all users (filtered by role if specified)
router.get("/", authMiddleware, getAllUsers);

// Route to get a specific user by ID
router.get("/:id", authMiddleware, getUserById);

// Route to update user profile by ID
router.patch("/:id", authMiddleware, authorizationMiddleware, updateUser);

export { router };
