import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

// Import routes directly
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import demoRoutes from "./routes/demoRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`🔍 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Test database connection
const testDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

// Mount routes directly
console.log("📦 Setting up routes...");
app.use("/api/auth", authRoutes);
console.log("✅ Auth routes mounted");

app.use("/api", chatRoutes);
console.log("✅ Chat routes mounted");

app.use("/api/demo", demoRoutes);
console.log("✅ Demo routes mounted");

// Health check route
app.get("/health", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();

    res.json({
      status: "OK",
      message: "AI Chatbot API is running",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Database connection failed",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// Handle 404 routes - fix for path-to-regexp
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Start server
const startServer = async () => {
  await testDatabaseConnection();

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/health`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
    console.log(`📋 Available endpoints:`);
    console.log(`   • POST /api/auth/register`);
    console.log(`   • POST /api/auth/login`);
    console.log(`   • GET  /api/auth/verify`);
    console.log(`   • POST /api/chat`);
    console.log(`   • GET  /api/chat/sessions`);
    console.log(`   • GET  /api/chat/history/:sessionId`);
    console.log(`   • POST /api/demo/session`);
    console.log(`   • POST /api/demo/message`);
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    console.log("🛑 SIGTERM received, shutting down gracefully");
    server.close(() => {
      console.log("✅ Server closed");
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    console.log("🛑 SIGINT received, shutting down gracefully");
    server.close(() => {
      console.log("✅ Server closed");
      process.exit(0);
    });
  });
};

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Start the server
startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});
