import { generateStudyGuide } from './gemini';
import { generatePDFBuffer } from './pdfGenerator';
import { uploadPDF } from './storage';
import { logger } from './logger';
import { marked } from 'marked'; // Helper to convert MD to HTML

export async function createAndStoreStudyGuide(userId: string, topicId: string, topicName: string) {
  try {
    // 1. Generate Content
    const mdContent = await generateStudyGuide(topicName);
    
    // 2. Convert Markdown to HTML (Basic conversion)
    const htmlContent = await marked.parse(mdContent);

    // 3. Generate PDF
    const pdfBuffer = await generatePDFBuffer(htmlContent);

    // 4. Upload
    const url = await uploadPDF(userId, topicId, pdfBuffer);
    
    return { url, content: mdContent };
  } catch (error) {
    logger.error("PDF Service Workflow Error", error);
    throw error;
  }
}
