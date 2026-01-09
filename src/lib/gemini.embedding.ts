import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"
dotenv.config()

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function getGeminiEmbedding(chunks: string[],isAddingData = false) {
  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: chunks,
      config:{
        taskType:isAddingData ? 'RETRIEVAL_DOCUMENT' :'RETRIEVAL_QUERY'
      }
    });

    if (!response.embeddings || response.embeddings.length === 0) {
      throw new Error("Gemini returned empty embeddings");
    }

    const embeddingRes = response.embeddings.map(embed => embed.values)

    return embeddingRes

  } catch (error: any) {
    console.error("Gemini embedding error:", {
      message: error.message,
      stack: error.stack,
    });

    throw new Error("Failed to generate embeddings using Gemini");
  }
}
