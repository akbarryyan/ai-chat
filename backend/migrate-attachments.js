import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const migrateAttachments = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("Connected to database for migration...");

    // Add attachments column to anonymous_chat_history table
    try {
      await connection.execute(`
        ALTER TABLE anonymous_chat_history 
        ADD COLUMN attachments JSON DEFAULT NULL
      `);
      console.log(
        "✅ Added attachments column to anonymous_chat_history table"
      );
    } catch (error) {
      if (error.code === "ER_DUP_FIELDNAME") {
        console.log(
          "ℹ️ Attachments column already exists in anonymous_chat_history table"
        );
      } else {
        throw error;
      }
    }

    // Also add to regular chat_history table for consistency
    try {
      await connection.execute(`
        ALTER TABLE chat_history 
        ADD COLUMN attachments JSON DEFAULT NULL
      `);
      console.log("✅ Added attachments column to chat_history table");
    } catch (error) {
      if (error.code === "ER_DUP_FIELDNAME") {
        console.log(
          "ℹ️ Attachments column already exists in chat_history table"
        );
      } else {
        throw error;
      }
    }

    await connection.end();
    console.log("🎉 Migration completed successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
};

migrateAttachments();
