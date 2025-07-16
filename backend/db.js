import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Pool with database selected
let dbPool;

// Function to create table if not exists
export const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();

    // Create database if not exists
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create chat_sessions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) DEFAULT 'New Chat',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create chat_history table with session reference
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS chat_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        session_id INT NOT NULL,
        user_message TEXT NOT NULL,
        ai_reply TEXT NOT NULL,
        attachments JSON DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
      )
    `);

    // Add attachments column if it doesn't exist (for existing databases)
    try {
      await connection.execute(`
        ALTER TABLE chat_history 
        ADD COLUMN attachments JSON DEFAULT NULL
      `);
      console.log("Added attachments column to chat_history");
    } catch (error) {
      // Column already exists, ignore the error
      if (error.code !== "ER_DUP_FIELDNAME") {
        console.log(
          "Attachments column already exists or other error:",
          error.code
        );
      }
    }

    // Create anonymous_chat_sessions table for demo users
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS anonymous_chat_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        session_token VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) DEFAULT 'Demo Chat',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 24 HOUR)
      )
    `);

    // Create anonymous_chat_history table for demo chat history
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS anonymous_chat_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        session_id INT NOT NULL,
        user_message TEXT NOT NULL,
        ai_reply TEXT NOT NULL,
        attachments JSON DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (session_id) REFERENCES anonymous_chat_sessions(id) ON DELETE CASCADE
      )
    `);

    // Add attachments column if it doesn't exist (for existing databases)
    try {
      await connection.execute(`
        ALTER TABLE anonymous_chat_history 
        ADD COLUMN attachments JSON DEFAULT NULL
      `);
      console.log("Added attachments column to anonymous_chat_history");
    } catch (error) {
      // Column already exists, ignore the error
      if (error.code !== "ER_DUP_FIELDNAME") {
        console.log(
          "Attachments column already exists or other error:",
          error.code
        );
      }
    }

    connection.release();

    // Create pool with database
    dbPool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};

export const getDbPool = () => dbPool;

export default pool;
