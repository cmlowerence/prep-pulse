import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the API key exists
const apiKey = process.env.GEMINI_API_KEY || "";

export const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Fast and efficient for study guides
});