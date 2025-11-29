import { sql } from '@vercel/postgres';

export const db = sql;

// Helper to ensure tables exist (Run this once or in a migration script)
export async function initDb() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        clerk_id VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS progress (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(clerk_id),
        topic_id VARCHAR(255) NOT NULL,
        score INTEGER DEFAULT 0,
        completed BOOLEAN DEFAULT FALSE,
        last_studied TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Add other tables (pdfs, logs) as needed here
    console.log("Database initialized");
  } catch (error) {
    console.error("Error initializing DB:", error);
  }
}
