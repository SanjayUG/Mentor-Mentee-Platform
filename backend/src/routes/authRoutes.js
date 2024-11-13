// src/routes/authRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
} from "../controllers/authController.js";

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to login an existing user
router.post("/login", loginUser);

// Route to refresh access token
router.post("/token", refreshToken);

export default router;
