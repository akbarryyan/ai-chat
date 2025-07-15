import { getDbPool } from "../db.js";
import axios from "axios";

export const sendChatMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const pool = getDbPool();
    let currentSessionId = sessionId;

    // If no session provided, create a new one
    if (!currentSessionId) {
      const [sessionResult] = await pool.execute(
        "INSERT INTO chat_sessions (user_id, title) VALUES (?, ?)",
        [
          req.user.userId,
          message.substring(0, 50) + (message.length > 50 ? "..." : ""),
        ]
      );
      currentSessionId = sessionResult.insertId;
    }

    // Prepare request to AKBXR API
    const akbxrRequest = {
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "auto",
    };

    // Send request to AKBXR API
    const response = await axios.post(
      `${process.env.AKBXR_BASE_URL}/chat/completions`,
      akbxrRequest,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AKBXR_API_KEY}`,
        },
      }
    );

    const aiResponse = response.data;
    const aiReply = aiResponse.choices[0].message.content;

    // Save to database with session_id
    await pool.execute(
      "INSERT INTO chat_history (session_id, user_message, ai_reply) VALUES (?, ?, ?)",
      [currentSessionId, message, aiReply]
    );

    // Update session updated_at
    await pool.execute(
      "UPDATE chat_sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [currentSessionId]
    );

    // Return response
    res.json({
      userMessage: message,
      aiReply: aiReply,
      sessionId: currentSessionId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const pool = getDbPool();

    const [rows] = await pool.execute(
      `SELECT ch.*, cs.title 
       FROM chat_history ch 
       JOIN chat_sessions cs ON ch.session_id = cs.id 
       WHERE cs.user_id = ? AND ch.session_id = ? 
       ORDER BY ch.created_at ASC`,
      [req.user.userId, sessionId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Get chat history error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChatSessions = async (req, res) => {
  try {
    const pool = getDbPool();

    const [rows] = await pool.execute(
      `SELECT cs.*, 
       (SELECT COUNT(*) FROM chat_history ch WHERE ch.session_id = cs.id) as message_count,
       (SELECT ch.user_message FROM chat_history ch WHERE ch.session_id = cs.id ORDER BY ch.created_at DESC LIMIT 1) as last_message
       FROM chat_sessions cs 
       WHERE cs.user_id = ? 
       ORDER BY cs.updated_at DESC`,
      [req.user.userId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Get chat sessions error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const pool = getDbPool();

    // Verify session belongs to user
    const [sessions] = await pool.execute(
      "SELECT id FROM chat_sessions WHERE id = ? AND user_id = ?",
      [sessionId, req.user.userId]
    );

    if (sessions.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Delete session (chat_history will be deleted automatically due to CASCADE)
    await pool.execute("DELETE FROM chat_sessions WHERE id = ?", [sessionId]);

    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Delete session error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
