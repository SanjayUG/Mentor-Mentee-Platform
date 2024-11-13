// src/app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import { router as achievementRouter } from "./routes/achievementRoutes.js";
import { router as progressRouter } from "./routes/progressRoutes.js";
import { router as userRouter } from "./routes/userRoutes.js";
import { router as messageRouter } from "./routes/messageRoutes.js";
import { router as sessionRouter } from "./routes/sessionRoutes.js";

const app = express();

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser()); // for handling cookies
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/achievements", achievementRouter); // Use the achievement routes here
app.use("/api/progress", progressRouter); // Use the progress routes here
app.use("/api/users", userRouter); // Use the user routes here
app.use("/api/messages", messageRouter); // Message routes
app.use("/api/sessions", sessionRouter); // Session routes

// Root route
app.get("/", (req, res) => {
  res.send("MentorMentee Platform API");
});

export { app };
