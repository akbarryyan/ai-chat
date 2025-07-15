import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const migrateDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log("Starting database migration...");

    // Check if chat_sessions table exists
    const [sessionsExists] = await connection.execute(
      `
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = ? AND table_name = 'chat_sessions'
    `,
      [process.env.DB_NAME]
    );

    if (sessionsExists[0].count === 0) {
      // Create chat_sessions table
      console.log("Creating chat_sessions table...");
      await connection.execute(`
        CREATE TABLE chat_sessions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          title VARCHAR(255) DEFAULT 'New Chat',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      console.log("✅ chat_sessions table created");
    } else {
      console.log("⚠️ chat_sessions table already exists");
    }

    // Check if chat_history has session_id column
    const [columnExists] = await connection.execute(
      `
      SELECT COUNT(*) as count 
      FROM information_schema.columns 
      WHERE table_schema = ? AND table_name = 'chat_history' AND column_name = 'session_id'
    `,
      [process.env.DB_NAME]
    );

    if (columnExists[0].count === 0) {
      console.log("Migrating chat_history table...");

      // Step 1: Add session_id column (nullable first)
      await connection.execute(`
        ALTER TABLE chat_history 
        ADD COLUMN session_id INT NULL AFTER id
      `);
      console.log("✅ Added session_id column");

      // Step 2: Create default sessions for existing chat history
      console.log("Creating default sessions for existing chats...");

      // Get all existing chat_history with user_id
      const [existingChats] = await connection.execute(`
        SELECT DISTINCT user_id FROM chat_history WHERE user_id IS NOT NULL
      `);

      for (const chat of existingChats) {
        // Create a default session for each user
        const [sessionResult] = await connection.execute(
          `
          INSERT INTO chat_sessions (user_id, title, created_at, updated_at)
          VALUES (?, 'Imported Chat', NOW(), NOW())
        `,
          [chat.user_id]
        );

        // Update all chat_history for this user to use the new session
        await connection.execute(
          `
          UPDATE chat_history 
          SET session_id = ? 
          WHERE user_id = ? AND session_id IS NULL
        `,
          [sessionResult.insertId, chat.user_id]
        );
      }
      console.log("✅ Migrated existing chat history to sessions");

      // Step 3: Remove user_id column and make session_id NOT NULL
      await connection.execute(`
        ALTER TABLE chat_history 
        DROP FOREIGN KEY chat_history_ibfk_1
      `);

      await connection.execute(`
        ALTER TABLE chat_history 
        DROP COLUMN user_id
      `);

      await connection.execute(`
        ALTER TABLE chat_history 
        MODIFY session_id INT NOT NULL
      `);

      // Step 4: Add foreign key constraint
      await connection.execute(`
        ALTER TABLE chat_history 
        ADD FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
      `);

      console.log("✅ Updated chat_history structure");
    } else {
      console.log("⚠️ chat_history already has session_id column");
    }

    console.log("🎉 Database migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await connection.end();
  }
};

// Run migration
migrateDatabase();
