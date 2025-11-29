import { blobStorage } from './vercel-blob';
import { db } from './db';
import { logger } from './logger';

export async function uploadPDF(
  userId: string, 
  topicId: string, 
  pdfBuffer: Buffer
) {
  try {
    const fileName = `guides/${userId}/${topicId}-${Date.now()}.pdf`;
    
    // 1. Upload to Blob
    const blob = await blobStorage.upload(fileName, pdfBuffer, 'application/pdf');

    // 2. Record in Postgres
    await db.query(`
      INSERT INTO generated_pdfs (user_id, topic_id, file_url, file_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `, [userId, topicId, blob.url, blob.pathname]);

    return blob.url;
  } catch (error) {
    logger.error("Storage Upload Error", error);
    throw new Error("Failed to upload file");
  }
}
