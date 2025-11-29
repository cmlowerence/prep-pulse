import { db } from './db';

export async function updateUserProgress(
  userId: string, 
  topicId: string, 
  score: number,
  total: number
) {
  const percentage = Math.round((score / total) * 100);
  const isCompleted = percentage >= 70; // Pass mark

  // Upsert progress
  await db.query(`
    INSERT INTO progress (user_id, topic_id, score, completed, last_studied)
    VALUES ($1, $2, $3, $4, NOW())
    ON CONFLICT (user_id, topic_id) 
    DO UPDATE SET 
      score = GREATEST(progress.score, EXCLUDED.score),
      completed = progress.completed OR EXCLUDED.completed,
      last_studied = NOW();
  `, [userId, topicId, percentage, isCompleted]);
  
  return { success: true };
}

export async function getUserProgress(userId: string) {
  const result = await db.query(`
    SELECT topic_id, score, completed FROM progress WHERE user_id = $1
  `, [userId]);
  
  return result.rows;
}
