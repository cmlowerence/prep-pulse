import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export interface ChatMessage {
  role: "user" | "model";
  parts: string;
}

export async function continueChat(history: ChatMessage[], newMessage: string) {
  const chat = model.startChat({
    history: history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.parts }]
    })),
  });

  const result = await chat.sendMessage(newMessage);
  return result.response.text();
}
