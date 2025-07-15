import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const fixDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log("Starting database fix...");

    // Check if there are any existing chat_history records without session_id
    const [orphanedChats] = await connection.execute(`
      SELECT COUNT(*) as count FROM chat_history WHERE session_id IS NULL
    `);

    if (orphanedChats[0].count > 0) {
      console.log(`Found ${orphanedChats[0].count} orphaned chat records`);

      // Delete orphaned chat records (since we can't associate them with users)
      await connection.execute(`
        DELETE FROM chat_history WHERE session_id IS NULL
      `);
      console.log("✅ Cleaned up orphaned chat records");
    }

    // Make session_id NOT NULL and add foreign key if not exists
    try {
      await connection.execute(`
        ALTER TABLE chat_history 
        MODIFY session_id INT NOT NULL
      `);
      console.log("✅ Made session_id NOT NULL");
    } catch (error) {
      if (error.code !== "ER_DUP_FIELDNAME") {
        console.log("⚠️ session_id already NOT NULL or error:", error.message);
      }
    }

    // Add foreign key constraint if not exists
    try {
      await connection.execute(`
        ALTER TABLE chat_history 
        ADD CONSTRAINT fk_chat_history_session 
        FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
      `);
      console.log("✅ Added foreign key constraint");
    } catch (error) {
      if (error.code === "ER_DUP_KEY") {
        console.log("⚠️ Foreign key constraint already exists");
      } else {
        console.log("⚠️ Foreign key error:", error.message);
      }
    }

    console.log("🎉 Database fix completed!");
  } catch (error) {
    console.error("❌ Fix failed:", error);
  } finally {
    await connection.end();
  }
};

// Run fix
fixDatabase();
