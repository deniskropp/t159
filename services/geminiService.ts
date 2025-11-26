import { GoogleGenAI } from "@google/genai";
import { INITIAL_AGENTS } from "../constants";

let client: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (process.env.API_KEY) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
};

export const getGeminiClient = () => client;

export const generateOrchestratorResponse = async (
  userMessage: string,
  chatHistory: { role: string; parts: { text: string }[] }[]
) => {
  if (!client) {
    // Fallback if API key is missing during dev, though strict rules say assume it's there.
    return "Gemini API Client not initialized. Please check your API_KEY environment variable.";
  }

  const model = client.models;
  
  const systemContext = `
    You are the Orchestrator of the T20-MAS (Multi-Agent System).
    Your goal is to coordinate the following agents: ${INITIAL_AGENTS.map(a => a.name).join(', ')}.
    You adhere to a "Clean, Minimally Natural" philosophy.
    You are calm, efficient, and strategic.
    Current system status is operational.
    The user is an external observer or administrator.
    Keep responses concise and professional, formatted in Markdown.
  `;

  try {
    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemContext }] }, // Pre-prompt context as first message or system instruction if supported in chat structure
        ...chatHistory.map(h => ({
            role: h.role === 'model' ? 'model' : 'user',
            parts: h.parts
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: systemContext, // Using config for system instruction is cleaner
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini interaction failed", error);
    return "I am currently unable to process your request due to a connection error with the central processing unit.";
  }
};
