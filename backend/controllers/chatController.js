import { pool } from "../db.js";
import axios from "axios";

const AKBXR_API_KEY = "UNLIMITED-BETA";

// Helper function to get AKBXR response
const getAKBXRResponse = async (messages) => {
  const akbxrRequest = {
    messages: messages,
    model: "auto",
  };

  const response = await axios.post(
    "https://api.akbxr.com/v1/chat/completions",
    akbxrRequest,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AKBXR_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].message.content;
};

export const sendChatMessage = async (req, res) => {
  try {
    const { message, sessionId, aiModel = "akbxr" } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

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

    // Get chat history to maintain context
    const [history] = await pool.execute(
      `SELECT user_message, ai_reply FROM chat_history 
       WHERE session_id = ? ORDER BY created_at ASC`,
      [currentSessionId]
    );

    // Prepare messages array for API context
    const messages = [];

    // Add conversation history for context (limit to last 10 exchanges to avoid token limits)
    const recentHistory = history.slice(-10);
    for (const chat of recentHistory) {
      messages.push({
        role: "user",
        content: chat.user_message,
      });
      messages.push({
        role: "assistant",
        content: chat.ai_reply,
      });
    }

    // Add current user message
    messages.push({
      role: "user",
      content: message,
    });

    let aiReply;
    let usedModel = aiModel; // Track which model was actually used

    // Choose AI model based on selection
    if (aiModel === "chatgpt4") {
      try {
        console.log("🤖 Using ChatGPT-4 API (Ferdev)...");

        const chatgptUrl = "https://api.ferdev.my.id/ai/chatgpt";
        const params = {
          prompt: message,
          apikey: "key-akbarryyan",
        };

        let chatgptResponse;
        let lastError;

        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            console.log(`🤖 ChatGPT-4 API (Ferdev) attempt ${attempt}/2...`);

            chatgptResponse = await axios.get(chatgptUrl, {
              params: params,
              headers: {
                "Content-Type": "application/json",
              },
              timeout: attempt === 1 ? 30000 : 45000,
            });

            console.log("✅ ChatGPT-4 API (Ferdev) request successful!");
            break;
          } catch (attemptError) {
            lastError = attemptError;
            console.log(
              `⚠️ ChatGPT-4 API attempt ${attempt} failed:`,
              attemptError.message
            );

            if (attempt < 2) {
              console.log("🔄 Retrying in 2 seconds...");
              await new Promise((resolve) => setTimeout(resolve, 2000));
            }
          }
        }

        if (!chatgptResponse) {
          throw lastError;
        }

        if (chatgptResponse.data) {
          let chatgptAnswer = null;

          if (chatgptResponse.data.success && chatgptResponse.data.message) {
            chatgptAnswer = chatgptResponse.data.message;
          } else if (
            chatgptResponse.data.status &&
            chatgptResponse.data.result
          ) {
            chatgptAnswer = chatgptResponse.data.result;
          } else if (chatgptResponse.data.result) {
            chatgptAnswer = chatgptResponse.data.result;
          } else if (typeof chatgptResponse.data === "string") {
            chatgptAnswer = chatgptResponse.data;
          }

          if (chatgptAnswer && chatgptAnswer.trim()) {
            aiReply = chatgptAnswer;
            console.log("✅ ChatGPT-4 API (Ferdev) success");
          } else {
            throw new Error("ChatGPT-4 API (Ferdev) returned no valid answer");
          }
        } else {
          throw new Error("ChatGPT-4 API (Ferdev) returned empty response");
        }
      } catch (chatgptError) {
        console.error("❌ ChatGPT-4 API (Ferdev) error:", chatgptError.message);
        usedModel = "akbxr"; // Mark as fallback

        // Fallback to AKBXR if ChatGPT-4 fails
        try {
          console.log("🔄 Falling back to AKBXR API...");
          const akbxrReply = await getAKBXRResponse(messages);
          aiReply = `${akbxrReply}\n\n*Note: ChatGPT-4 was unavailable, responded using AKBXR AI*`;
          console.log("✅ AKBXR fallback success");
        } catch (fallbackError) {
          console.error("❌ AKBXR fallback error:", fallbackError);
          aiReply = "Sorry, I encountered an error. Please try again.";
          usedModel = "error";
        }
      }
    } else if (aiModel === "gemini") {
      try {
        console.log("🤖 Using Gemini API (Ferdev)...");

        const geminiUrl = "https://api.ferdev.my.id/ai/gemini";
        const params = {
          prompt: message,
          apikey: "key-akbarryyan",
        };

        let geminiResponse;
        let lastError;

        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            console.log(`🤖 Gemini API (Ferdev) attempt ${attempt}/2...`);

            geminiResponse = await axios.get(geminiUrl, {
              params: params,
              headers: {
                "Content-Type": "application/json",
              },
              timeout: attempt === 1 ? 30000 : 45000,
            });

            console.log("✅ Gemini API (Ferdev) request successful!");
            break;
          } catch (attemptError) {
            lastError = attemptError;
            console.log(
              `⚠️ Gemini API attempt ${attempt} failed:`,
              attemptError.message
            );

            if (attempt < 2) {
              console.log("🔄 Retrying in 2 seconds...");
              await new Promise((resolve) => setTimeout(resolve, 2000));
            }
          }
        }

        if (!geminiResponse) {
          throw lastError;
        }

        if (geminiResponse.data) {
          let geminiAnswer = null;

          if (geminiResponse.data.success && geminiResponse.data.message) {
            geminiAnswer = geminiResponse.data.message;
          } else if (geminiResponse.data.status && geminiResponse.data.result) {
            geminiAnswer = geminiResponse.data.result;
          } else if (geminiResponse.data.result) {
            geminiAnswer = geminiResponse.data.result;
          } else if (typeof geminiResponse.data === "string") {
            geminiAnswer = geminiResponse.data;
          }

          if (geminiAnswer && geminiAnswer.trim()) {
            aiReply = geminiAnswer;
            console.log("✅ Gemini API (Ferdev) success");
          } else {
            throw new Error("Gemini API (Ferdev) returned no valid answer");
          }
        } else {
          throw new Error("Gemini API (Ferdev) returned empty response");
        }
      } catch (geminiError) {
        console.error("❌ Gemini API (Ferdev) error:", geminiError.message);
        usedModel = "akbxr"; // Mark as fallback

        // Fallback to AKBXR if Gemini fails
        try {
          console.log("🔄 Falling back to AKBXR API...");
          const akbxrReply = await getAKBXRResponse(messages);
          aiReply = `${akbxrReply}\n\n*Note: Gemini AI was unavailable, responded using AKBXR AI*`;
          console.log("✅ AKBXR fallback success");
        } catch (fallbackError) {
          console.error("❌ AKBXR fallback error:", fallbackError);
          aiReply = "Sorry, I encountered an error. Please try again.";
          usedModel = "error";
        }
      }
    } else if (aiModel === "claude") {
      try {
        console.log("🤖 Using Claude AI (Ferdev)...");

        const claudeUrl = "https://api.ferdev.my.id/ai/claude";
        const params = {
          prompt: message,
          apikey: "key-akbarryyan",
        };

        let claudeResponse;
        let lastError;

        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            console.log(`🤖 Claude AI (Ferdev) attempt ${attempt}/2...`);

            claudeResponse = await axios.get(claudeUrl, {
              params: params,
              headers: {
                "Content-Type": "application/json",
              },
              timeout: attempt === 1 ? 30000 : 45000,
            });

            console.log("✅ Claude AI (Ferdev) request successful!");
            break;
          } catch (attemptError) {
            lastError = attemptError;
            console.log(
              `⚠️ Claude API attempt ${attempt} failed:`,
              attemptError.message
            );

            if (attempt < 2) {
              console.log("🔄 Retrying in 2 seconds...");
              await new Promise((resolve) => setTimeout(resolve, 2000));
            }
          }
        }

        if (!claudeResponse) {
          throw lastError;
        }

        if (claudeResponse.data) {
          let claudeAnswer = null;

          if (claudeResponse.data.success && claudeResponse.data.message) {
            claudeAnswer = claudeResponse.data.message;
          } else if (claudeResponse.data.status && claudeResponse.data.result) {
            claudeAnswer = claudeResponse.data.result;
          } else if (claudeResponse.data.result) {
            claudeAnswer = claudeResponse.data.result;
          } else if (typeof claudeResponse.data === "string") {
            claudeAnswer = claudeResponse.data;
          }

          if (claudeAnswer && claudeAnswer.trim()) {
            aiReply = claudeAnswer;
            console.log("✅ Claude AI (Ferdev) success");
          } else {
            throw new Error("Claude AI (Ferdev) returned no valid answer");
          }
        } else {
          throw new Error("Claude AI (Ferdev) returned empty response");
        }
      } catch (claudeError) {
        console.error("❌ Claude AI (Ferdev) error:", claudeError.message);
        usedModel = "akbxr"; // Mark as fallback

        // Fallback to AKBXR if Claude fails
        try {
          console.log("🔄 Falling back to AKBXR API...");
          const akbxrReply = await getAKBXRResponse(messages);
          aiReply = `${akbxrReply}\n\n*Note: Claude AI was unavailable, responded using AKBXR AI*`;
          console.log("✅ AKBXR fallback success");
        } catch (fallbackError) {
          console.error("❌ AKBXR fallback error:", fallbackError);
          aiReply = "Sorry, I encountered an error. Please try again.";
          usedModel = "error";
        }
      }
    } else {
      // Default: Use AKBXR API
      try {
        console.log("🤖 Using AKBXR API (default)...");
        const akbxrReply = await getAKBXRResponse(messages);
        aiReply = akbxrReply;
        console.log("✅ AKBXR API success");
      } catch (akbxrError) {
        console.error("❌ AKBXR API error:", akbxrError);
        usedModel = "error";
        aiReply = "Sorry, I encountered an error. Please try again.";
      }
    }

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
      usedModel: usedModel, // Include which model was actually used
      requestedModel: aiModel, // Include which model was requested
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
