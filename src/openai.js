import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function sendMsgToOpenAI(message) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
  });

  return response.text;
}