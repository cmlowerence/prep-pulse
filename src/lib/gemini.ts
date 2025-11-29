import { GoogleGenerativeAI } from "@google/generative-ai";
import { logger } from "@/lib/logger";
import { getMockStudyGuide, getMockQuiz } from "./gemini-mock";

const API_KEY = process.env.GOOGLE_GENAI_API_KEY || "";
const USE_MOCK = process.env.USE_GEMINI_MOCK === "true";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Strict JSON schema for quizzes
const QUIZ_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: { type: "array", items: { type: "string" } },
          correctIndex: { type: "number" },
          explanation: { type: "string" }
        },
        required: ["question", "options", "correctIndex", "explanation"]
      }
    }
  },
  required: ["title", "questions"]
};

export async function generateStudyGuide(topic: string) {
  if (USE_MOCK) {
    logger.info("Using Mock AI for Study Guide");
    return getMockStudyGuide(topic);
  }

  try {
    const prompt = `
      You are an expert educator. Produce a structured study guide for "${topic}".
      Use Markdown + KaTeX for math. 
      Structure:
      # ${topic}
      ## Overview
      ## Key Concepts
      ## Important Formulas (Use $$ for block math, \\( \\) for inline)
      ## Worked Examples
      ## Practice Questions
      
      Keep it accurate, exam-focused, and strictly formatted.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    logger.error("Gemini Study Guide Error", error);
    throw new Error("Failed to generate study guide.");
  }
}

export async function generateQuizJSON(topic: string, difficulty: string = "medium") {
  if (USE_MOCK) {
    logger.info("Using Mock AI for Quiz");
    return getMockQuiz(topic);
  }

  try {
    const prompt = `
      Generate a ${difficulty} level quiz for "${topic}".
      Return ONLY valid JSON. No markdown formatting.
      Schema:
      {
        "title": "string",
        "questions": [
          {
            "question": "string",
            "options": ["A", "B", "C", "D"],
            "correctIndex": number (0-3),
            "explanation": "string"
          }
        ]
      }
    `;

    // Using JSON mode if supported or strict parsing
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Clean up markdown code blocks if Gemini adds them
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(cleanJson);
  } catch (error) {
    logger.error("Gemini Quiz Error", error);
    throw new Error("Failed to generate quiz.");
  }
}
