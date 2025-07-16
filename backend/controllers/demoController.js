import { getDbPool } from "../db.js";
import crypto from "crypto";

// Create a new anonymous chat session
export const createDemoSession = async (req, res) => {
  try {
    const pool = getDbPool();
    const sessionToken = crypto.randomUUID();

    const [result] = await pool.execute(
      `INSERT INTO anonymous_chat_sessions (session_token) VALUES (?)`,
      [sessionToken]
    );

    res.json({
      success: true,
      sessionToken,
      sessionId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating demo session:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create demo session",
    });
  }
};

// Send message in demo chat
export const sendDemoMessage = async (req, res) => {
  try {
    const { sessionToken, message } = req.body;

    if (!sessionToken || !message) {
      return res.status(400).json({
        success: false,
        message: "Session token and message are required",
      });
    }

    const pool = getDbPool();

    // Verify session exists and not expired
    const [sessions] = await pool.execute(
      `SELECT id FROM anonymous_chat_sessions WHERE session_token = ? AND expires_at > NOW()`,
      [sessionToken]
    );

    if (sessions.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired session",
      });
    }

    const sessionId = sessions[0].id;

    // Simple AI response (you can integrate with actual AI service here)
    const aiResponses = [
      "Hello! I'm AKBAR AI. I can help you with various questions and tasks. What would you like to know?",
      "That's an interesting question! Based on my understanding, I can provide you with relevant information and assistance.",
      "I'm here to help! Feel free to ask me anything about technology, general knowledge, or how I can assist you.",
      "Thank you for trying our demo! I'm designed to be helpful, harmless, and honest in all my responses.",
      "Great question! I can help you with problem-solving, creative tasks, analysis, and much more. What specific area interests you?",
    ];

    const aiReply = aiResponses[Math.floor(Math.random() * aiResponses.length)];

    // Save chat history
    await pool.execute(
      `INSERT INTO anonymous_chat_history (session_id, user_message, ai_reply) VALUES (?, ?, ?)`,
      [sessionId, message, aiReply]
    );

    // Update session timestamp
    await pool.execute(
      `UPDATE anonymous_chat_sessions SET updated_at = NOW() WHERE id = ?`,
      [sessionId]
    );

    res.json({
      success: true,
      message: aiReply,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error sending demo message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

// Get demo chat history
export const getDemoHistory = async (req, res) => {
  try {
    const { sessionToken } = req.params;

    if (!sessionToken) {
      return res.status(400).json({
        success: false,
        message: "Session token is required",
      });
    }

    const pool = getDbPool();

    // Get session and verify it's not expired
    const [sessions] = await pool.execute(
      `SELECT id FROM anonymous_chat_sessions WHERE session_token = ? AND expires_at > NOW()`,
      [sessionToken]
    );

    if (sessions.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired session",
      });
    }

    const sessionId = sessions[0].id;

    // Get chat history
    const [history] = await pool.execute(
      `SELECT user_message, ai_reply, created_at FROM anonymous_chat_history 
       WHERE session_id = ? ORDER BY created_at ASC`,
      [sessionId]
    );

    res.json({
      success: true,
      history: history.map((chat) => ({
        userMessage: chat.user_message,
        aiReply: chat.ai_reply,
        timestamp: chat.created_at,
      })),
    });
  } catch (error) {
    console.error("Error getting demo history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get chat history",
    });
  }
};

// Clean up expired sessions (call this periodically)
export const cleanupExpiredSessions = async () => {
  try {
    const pool = getDbPool();
    await pool.execute(
      `DELETE FROM anonymous_chat_sessions WHERE expires_at < NOW()`
    );
    console.log("Cleaned up expired anonymous sessions");
  } catch (error) {
    console.error("Error cleaning up expired sessions:", error);
  }
};
