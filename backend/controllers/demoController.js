import { pool } from "../db.js";
import crypto from "crypto";
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

// Create a new anonymous chat session
export const createDemoSession = async (req, res) => {
  try {
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
    const { sessionToken, message, attachments, aiModel = "akbxr" } = req.body;

    if (
      !sessionToken ||
      (!message && (!attachments || attachments.length === 0))
    ) {
      return res.status(400).json({
        success: false,
        message: "Session token and message or attachments are required",
      });
    }

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

    // Get chat history to maintain context
    const [history] = await pool.execute(
      `SELECT user_message, ai_reply FROM anonymous_chat_history 
       WHERE session_id = ? ORDER BY created_at ASC`,
      [sessionId]
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

    // Add current user message with attachments
    let userContent = message || "";

    if (attachments && attachments.length > 0) {
      // For demo purposes, provide helpful information about attachments
      const attachmentDescriptions = attachments
        .map((att) => {
          if (att.type.startsWith("image/")) {
            return `User has uploaded an image file: ${att.name}. Since this is a demo version, I cannot actually see the image content, but I can provide general guidance about image analysis, help with common image-related questions, or suggest how to describe images for better assistance.`;
          } else if (att.type === "application/pdf") {
            return `User has uploaded a PDF document: ${att.name}. Since this is a demo version, I cannot read the actual PDF content, but I can provide guidance about document analysis, summarization techniques, or help with common document-related tasks.`;
          } else {
            return `User has uploaded a document: ${att.name}. Since this is a demo version, I cannot read the actual file content, but I can provide guidance about document processing or help with common document-related questions.`;
          }
        })
        .join("\n");

      userContent = userContent
        ? `${userContent}\n\n${attachmentDescriptions}`
        : `${attachmentDescriptions}\n\nPlease provide helpful guidance about working with the uploaded file type, or suggest alternative approaches for the user's request.`;
    }

    messages.push({
      role: "user",
      content: userContent,
    });

    let aiReply;

    let usedModel = aiModel; // Track which model was actually used

    // Choose AI model based on selection
    if (aiModel === "chatgpt4") {
      try {
        console.log(
          "🤖 Trying ChatGPT-4 API (Ferdev) with text:",
          userContent.substring(0, 50) + "..."
        );
        console.log("🤖 Session token:", sessionToken);

        // Use Ferdev API for ChatGPT-4 with GET method
        const chatgptUrl = "https://api.ferdev.my.id/ai/chatgpt";
        const params = {
          prompt: userContent,
          apikey: "key-akbarryyan",
        };

        console.log("🤖 Making GET request to:", chatgptUrl);
        console.log("🤖 With params:", params);

        // Try with longer timeout and retry mechanism
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
              timeout: attempt === 1 ? 30000 : 45000, // Longer timeout on retry
            });

            console.log("✅ ChatGPT-4 API (Ferdev) request successful!");
            break; // Success, exit retry loop
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
          throw lastError; // Throw the last error if all attempts failed
        }

        console.log(
          "🤖 ChatGPT-4 API (Ferdev) response status:",
          chatgptResponse.status
        );
        console.log(
          "🤖 ChatGPT-4 API (Ferdev) response data:",
          JSON.stringify(chatgptResponse.data, null, 2)
        );

        // Check response format for Ferdev API
        if (chatgptResponse.data) {
          let chatgptAnswer = null;

          // Try Ferdev API response structure first
          if (chatgptResponse.data.success && chatgptResponse.data.message) {
            chatgptAnswer = chatgptResponse.data.message;
          } else if (
            chatgptResponse.data.status &&
            chatgptResponse.data.result
          ) {
            chatgptAnswer = chatgptResponse.data.result;
          }
          // Fallback to other possible structures
          else if (chatgptResponse.data.result) {
            chatgptAnswer = chatgptResponse.data.result;
          } else if (chatgptResponse.data.response) {
            chatgptAnswer = chatgptResponse.data.response;
          } else if (chatgptResponse.data.content) {
            chatgptAnswer = chatgptResponse.data.content;
          } else if (typeof chatgptResponse.data === "string") {
            chatgptAnswer = chatgptResponse.data;
          }

          if (chatgptAnswer && chatgptAnswer.trim()) {
            aiReply = `🤖 **ChatGPT-4 Response:**\n\n${chatgptAnswer}`;
            console.log(
              "✅ ChatGPT-4 API (Ferdev) success - Found answer in response"
            );
          } else {
            console.log(
              "❌ ChatGPT-4 API (Ferdev): No valid answer found in response structure"
            );
            console.log(
              "❌ Available fields:",
              Object.keys(chatgptResponse.data)
            );
            throw new Error("ChatGPT-4 API (Ferdev) returned no valid answer");
          }
        } else {
          console.log("❌ ChatGPT-4 API (Ferdev): Empty response data");
          throw new Error("ChatGPT-4 API (Ferdev) returned empty response");
        }
      } catch (chatgptError) {
        console.error("❌ ChatGPT-4 API (Ferdev) error:", chatgptError.message);
        if (chatgptError.response) {
          console.error(
            "❌ ChatGPT-4 API (Ferdev) error response:",
            chatgptError.response.data
          );
        }
        usedModel = "akbxr"; // Mark as fallback

        // Determine fallback reason for better user feedback
        let fallbackReason = "unavailable";
        if (
          chatgptError.code === "ECONNABORTED" ||
          chatgptError.message.includes("timeout")
        ) {
          fallbackReason = "timeout - server took too long to respond";
        } else if (chatgptError.response?.status >= 500) {
          fallbackReason = "server error";
        } else if (chatgptError.response?.status === 429) {
          fallbackReason = "rate limited";
        } else if (chatgptError.response?.status === 401) {
          fallbackReason = "API key authentication failed";
        }

        // Fallback to AKBXR if ChatGPT-4 fails
        try {
          console.log("🔄 Falling back to AKBXR API...");
          const akbxrReply = await getAKBXRResponse(messages);
          aiReply = `🔶 **AKBXR AI Response** (ChatGPT-4 ${fallbackReason}):\n\n${akbxrReply}`;
          console.log("✅ AKBXR fallback success");
        } catch (fallbackError) {
          console.error("❌ AKBXR fallback error:", fallbackError);
          aiReply =
            "Maaf, kedua AI sedang mengalami gangguan. Silakan coba lagi dalam beberapa saat.";
          usedModel = "error";
        }
      }
    } else if (aiModel === "gemini") {
      try {
        console.log(
          "🤖 Trying Gemini API (Ferdev) with text:",
          userContent.substring(0, 50) + "..."
        );
        console.log("🤖 Session token:", sessionToken);

        // Use Ferdev API for Gemini with GET method (assuming same endpoint structure)
        const geminiUrl = "https://api.ferdev.my.id/ai/gemini"; // Assuming gemini endpoint
        const params = {
          prompt: userContent,
          apikey: "key-akbarryyan",
        };

        console.log("🤖 Making GET request to:", geminiUrl);
        console.log("🤖 With params:", params);

        // Try with longer timeout and retry mechanism
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
              timeout: attempt === 1 ? 30000 : 45000, // Longer timeout on retry
            });

            console.log("✅ Gemini API (Ferdev) request successful!");
            break; // Success, exit retry loop
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
          throw lastError; // Throw the last error if all attempts failed
        }

        console.log(
          "🤖 Gemini API (Ferdev) response status:",
          geminiResponse.status
        );
        console.log(
          "🤖 Gemini API (Ferdev) response data:",
          JSON.stringify(geminiResponse.data, null, 2)
        );

        // Check response format for Ferdev API
        if (geminiResponse.data) {
          let geminiAnswer = null;

          // Try Ferdev API response structure first
          if (geminiResponse.data.success && geminiResponse.data.message) {
            geminiAnswer = geminiResponse.data.message;
          } else if (geminiResponse.data.status && geminiResponse.data.result) {
            geminiAnswer = geminiResponse.data.result;
          }
          // Fallback to other possible structures
          else if (geminiResponse.data.result) {
            geminiAnswer = geminiResponse.data.result;
          } else if (geminiResponse.data.response) {
            geminiAnswer = geminiResponse.data.response;
          } else if (geminiResponse.data.content) {
            geminiAnswer = geminiResponse.data.content;
          } else if (typeof geminiResponse.data === "string") {
            geminiAnswer = geminiResponse.data;
          }

          if (geminiAnswer && geminiAnswer.trim()) {
            aiReply = `� **Gemini AI Response:**\n\n${geminiAnswer}`;
            console.log(
              "✅ Gemini API (Ferdev) success - Found answer in response"
            );
          } else {
            console.log(
              "❌ Gemini API (Ferdev): No valid answer found in response structure"
            );
            console.log(
              "❌ Available fields:",
              Object.keys(geminiResponse.data)
            );
            throw new Error("Gemini API (Ferdev) returned no valid answer");
          }
        } else {
          console.log("❌ Gemini API (Ferdev): Empty response data");
          throw new Error("Gemini API (Ferdev) returned empty response");
        }
      } catch (geminiError) {
        console.error("❌ Gemini API (Ferdev) error:", geminiError.message);
        if (geminiError.response) {
          console.error(
            "❌ Gemini API (Ferdev) error response:",
            geminiError.response.data
          );
        }
        usedModel = "akbxr"; // Mark as fallback

        // Determine fallback reason for better user feedback
        let fallbackReason = "unavailable";
        if (
          geminiError.code === "ECONNABORTED" ||
          geminiError.message.includes("timeout")
        ) {
          fallbackReason = "timeout - server took too long to respond";
        } else if (geminiError.response?.status >= 500) {
          fallbackReason = "server error";
        } else if (geminiError.response?.status === 429) {
          fallbackReason = "rate limited";
        } else if (geminiError.response?.status === 401) {
          fallbackReason = "API key authentication failed";
        }

        // Fallback to AKBXR if Gemini fails
        try {
          console.log("🔄 Falling back to AKBXR API...");
          const akbxrReply = await getAKBXRResponse(messages);
          aiReply = `🔶 **AKBXR AI Response** (Gemini ${fallbackReason}):\n\n${akbxrReply}`;
          console.log("✅ AKBXR fallback success");
        } catch (fallbackError) {
          console.error("❌ AKBXR fallback error:", fallbackError);
          aiReply =
            "Maaf, kedua AI sedang mengalami gangguan. Silakan coba lagi dalam beberapa saat.";
          usedModel = "error";
        }
      }
    } else if (aiModel === "claude") {
      try {
        console.log(
          "🤖 Trying Claude AI (Ferdev) with text:",
          userContent.substring(0, 50) + "..."
        );
        console.log("🤖 Session token:", sessionToken);

        // Use Ferdev API for Claude with GET method
        const claudeUrl = "https://api.ferdev.my.id/ai/claude";
        const params = {
          prompt: userContent,
          apikey: "key-akbarryyan",
        };

        console.log("🤖 Making GET request to:", claudeUrl);
        console.log("🤖 With params:", params);

        // Try with longer timeout and retry mechanism
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
              timeout: attempt === 1 ? 30000 : 45000, // Longer timeout on retry
            });

            console.log("✅ Claude AI (Ferdev) request successful!");
            break; // Success, exit retry loop
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
          throw lastError; // Throw the last error if all attempts failed
        }

        console.log(
          "🤖 Claude AI (Ferdev) response status:",
          claudeResponse.status
        );
        console.log(
          "🤖 Claude AI (Ferdev) response data:",
          JSON.stringify(claudeResponse.data, null, 2)
        );

        // Check response format for Ferdev API
        if (claudeResponse.data) {
          let claudeAnswer = null;

          // Try Ferdev API response structure first
          if (claudeResponse.data.success && claudeResponse.data.message) {
            claudeAnswer = claudeResponse.data.message;
          } else if (claudeResponse.data.status && claudeResponse.data.result) {
            claudeAnswer = claudeResponse.data.result;
          }
          // Fallback to other possible structures
          else if (claudeResponse.data.result) {
            claudeAnswer = claudeResponse.data.result;
          } else if (claudeResponse.data.response) {
            claudeAnswer = claudeResponse.data.response;
          } else if (claudeResponse.data.content) {
            claudeAnswer = claudeResponse.data.content;
          } else if (typeof claudeResponse.data === "string") {
            claudeAnswer = claudeResponse.data;
          }

          if (claudeAnswer && claudeAnswer.trim()) {
            aiReply = `🧠 **Claude AI Response:**\n\n${claudeAnswer}`;
            console.log(
              "✅ Claude AI (Ferdev) success - Found answer in response"
            );
          } else {
            console.log(
              "❌ Claude AI (Ferdev): No valid answer found in response structure"
            );
            console.log(
              "❌ Available fields:",
              Object.keys(claudeResponse.data)
            );
            throw new Error("Claude AI (Ferdev) returned no valid answer");
          }
        } else {
          console.log("❌ Claude AI (Ferdev): Empty response data");
          throw new Error("Claude AI (Ferdev) returned empty response");
        }
      } catch (claudeError) {
        console.error("❌ Claude AI (Ferdev) error:", claudeError.message);
        if (claudeError.response) {
          console.error(
            "❌ Claude AI (Ferdev) error response:",
            claudeError.response.data
          );
        }
        usedModel = "akbxr"; // Mark as fallback

        // Determine fallback reason for better user feedback
        let fallbackReason = "unavailable";
        if (
          claudeError.code === "ECONNABORTED" ||
          claudeError.message.includes("timeout")
        ) {
          fallbackReason = "timeout - server took too long to respond";
        } else if (claudeError.response?.status >= 500) {
          fallbackReason = "server error";
        } else if (claudeError.response?.status === 429) {
          fallbackReason = "rate limited";
        } else if (claudeError.response?.status === 401) {
          fallbackReason = "API key authentication failed";
        }

        // Fallback to AKBXR if Claude fails
        try {
          console.log("🔄 Falling back to AKBXR API...");
          const akbxrReply = await getAKBXRResponse(messages);
          aiReply = `🔶 **AKBXR AI Response** (Claude ${fallbackReason}):\n\n${akbxrReply}`;
          console.log("✅ AKBXR fallback success");
        } catch (fallbackError) {
          console.error("❌ AKBXR fallback error:", fallbackError);
          aiReply =
            "Maaf, kedua AI sedang mengalami gangguan. Silakan coba lagi dalam beberapa saat.";
          usedModel = "error";
        }
      }
    } else {
      // Default: Use AKBXR API
      try {
        console.log("🤖 Using AKBXR API (default)...");
        const akbxrReply = await getAKBXRResponse(messages);
        aiReply = `🔶 **AKBXR AI Response:**\n\n${akbxrReply}`;
        console.log("✅ AKBXR API success");
      } catch (akbxrError) {
        console.error("❌ AKBXR API error:", akbxrError);
        usedModel = "error";
        // Fallback response for AKBXR
        if (attachments && attachments.length > 0) {
          const hasImages = attachments.some((att) =>
            att.type.startsWith("image/")
          );
          if (hasImages) {
            aiReply = `🖼️ **Demo Mode - File Upload**

Saya melihat Anda telah mengupload file! Dalam mode demo ini, saya dapat membantu dengan:

**📱 Yang bisa saya lakukan:**
• Menjawab pertanyaan umum
• Membantu dengan teks dan kode
• Memberikan penjelasan konsep
• Memberikan saran dan guidance

**📄 Untuk file yang diupload:**
• Deskripsikan konten file Anda
• Jelaskan apa yang ingin Anda ketahui
• Tanyakan hal spesifik yang memerlukan bantuan

**💡 Tips:** Semakin detail deskripsi Anda, semakin baik saya bisa membantu!

Ada yang bisa saya bantu? 😊`;
          } else {
            aiReply =
              "Maaf, saya mengalami kesulitan teknis saat memproses file Anda. Ini adalah versi demo AKBAR AI. Silakan coba lagi atau daftarkan diri untuk pengalaman lengkap!";
          }
        } else {
          aiReply =
            "Maaf, saya mengalami kesulitan teknis. Ini adalah versi demo AKBAR AI. Silakan coba lagi atau daftarkan diri untuk pengalaman lengkap!";
        }
      }
    }

    // If AI mentions inability to see images and user uploaded an image, provide demo-specific guidance
    if (
      attachments &&
      attachments.some((att) => att.type.startsWith("image/")) &&
      (aiReply.toLowerCase().includes("tidak bisa melihat") ||
        aiReply.toLowerCase().includes("can't see") ||
        aiReply.toLowerCase().includes("cannot see"))
    ) {
      const imageFiles = attachments.filter((att) =>
        att.type.startsWith("image/")
      );
      const imageNames = imageFiles.map((img) => img.name).join(", ");

      aiReply = `🖼️ **Image Upload Demo**

Saya melihat Anda telah mengupload gambar: **${imageNames}**

Dalam versi demo ini, saya belum bisa menganalisis konten gambar secara langsung. Namun, untuk membantu Anda lebih baik, Anda bisa:

**📝 Untuk analisis gambar:**
• Deskripsikan apa yang terlihat dalam gambar
• Sebutkan warna, bentuk, objek, atau teks yang ada
• Jelaskan konteks atau tujuan analisis yang diinginkan

**🔧 Fitur yang tersedia:**
• Analisis teks dan pertanyaan umum
• Pemecahan masalah matematika (jika dideskripsikan)
• Bantuan dengan kode atau dokumen teks
• Guidance dan saran berdasarkan deskripsi

**💡 Tips:** Coba deskripsikan gambar Anda, dan saya akan memberikan bantuan terbaik berdasarkan informasi tersebut!

Silakan tanya apa saja yang bisa saya bantu! 😊`;
    }

    // Save chat history with attachments info
    const messageToSave = message || "Sent attachments";
    const attachmentInfo =
      attachments && attachments.length > 0
        ? JSON.stringify(
            attachments.map((att) => ({ name: att.name, type: att.type }))
          )
        : null;

    await pool.execute(
      `INSERT INTO anonymous_chat_history (session_id, user_message, ai_reply, attachments) VALUES (?, ?, ?, ?)`,
      [sessionId, messageToSave, aiReply, attachmentInfo]
    );

    // Update session timestamp
    await pool.execute(
      `UPDATE anonymous_chat_sessions SET updated_at = NOW() WHERE id = ?`,
      [sessionId]
    );

    res.json({
      success: true,
      message: aiReply,
      usedModel: usedModel, // Include which model was actually used
      requestedModel: aiModel, // Include which model was requested
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
    await pool.execute(
      `DELETE FROM anonymous_chat_sessions WHERE expires_at < NOW()`
    );
    console.log("Cleaned up expired anonymous sessions");
  } catch (error) {
    console.error("Error cleaning up expired sessions:", error);
  }
};
