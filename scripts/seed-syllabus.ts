import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // 1. Create Tables if they don't exist
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
        last_studied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, topic_id)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS generated_pdfs (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(clerk_id),
        topic_id VARCHAR(255) NOT NULL,
        file_url TEXT NOT NULL,
        file_name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('✅ Database tables ready.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
