import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeDatabase } from "./db.js";
import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import demoRoutes from "./routes/demoRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" })); // Increase limit for file attachments
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize database
initializeDatabase();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);
app.use("/api/demo", demoRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "AI Chatbot API is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
