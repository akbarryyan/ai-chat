import { getDbPool } from "../db.js";
import crypto from "crypto";
import axios from "axios";

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
    const { sessionToken, message, attachments } = req.body;

    if (
      !sessionToken ||
      (!message && (!attachments || attachments.length === 0))
    ) {
      return res.status(400).json({
        success: false,
        message: "Session token and message or attachments are required",
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

    // Prepare request to AKBXR API
    const akbxrRequest = {
      messages: messages,
      model: "auto",
    };

    let aiReply;
    try {
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

      aiReply = response.data.choices[0].message.content;

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
    } catch (apiError) {
      console.error("AKBXR API error:", apiError);
      // Fallback to demo response if API fails
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
