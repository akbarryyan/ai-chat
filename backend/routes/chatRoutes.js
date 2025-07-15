import express from "express";
import {
  sendChatMessage,
  getChatHistory,
  getChatSessions,
  deleteSession,
} from "../controllers/chatController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// POST /api/chat - Send a chat message
router.post("/chat", authenticateToken, sendChatMessage);

// GET /api/chat/sessions - Get user's chat sessions
router.get("/chat/sessions", authenticateToken, getChatSessions);

// GET /api/chat/history/:sessionId - Get chat history for a session
router.get("/chat/history/:sessionId", authenticateToken, getChatHistory);

// DELETE /api/chat/sessions/:sessionId - Delete a chat session
router.delete("/chat/sessions/:sessionId", authenticateToken, deleteSession);

export default router;
