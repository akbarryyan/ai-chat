import express from "express";
import {
  createDemoSession,
  sendDemoMessage,
  getDemoHistory,
} from "../controllers/demoController.js";

const router = express.Router();

// Create new demo session
router.post("/session", createDemoSession);

// Send message in demo chat
router.post("/message", sendDemoMessage);

// Get demo chat history
router.get("/history/:sessionToken", getDemoHistory);

export default router;
