import { getGeminiEmbedding } from "../../lib/gemini.embedding";
import { searchSimilarData } from "../../lib/getRelevantData";

export const requestService = {
  async getRelevantData(userInput: string) {
    try {
      // Step 1 — Create embedding for user query
      const embeddings = await getGeminiEmbedding([userInput]);

      if (!embeddings || !embeddings[0]) {
        return {
          success: false,
          error: "Embedding generation failed",
        };
      }

      const userVector = embeddings[0];

      // Step 2 — Perform vector search
      const results = await searchSimilarData(userVector);

      return {
        success: true,
        count: results.length,
        results,
      };

    } catch (error: any) {
      console.error("requestService.getRelevantData error:", error);

      return {
        success: false,
        error: error.message || "Unknown error",
      };
    }
  },
};
