import { chunkText } from "../../lib/chunk";
import { getGeminiEmbedding } from "../../lib/gemini.embedding";
import { prisma } from "../../config/prisma";

export const dataService = {
  async addDocument(text: string) {
    try {
      const chunks = await chunkText(text);

      const embeddings = await getGeminiEmbedding(chunks, true);

      if (chunks.length !== embeddings.length) {
        throw new Error("Chunk / embedding count mismatch");
      }

      const records = chunks.map((content, i) => ({
        content,
        vector: embeddings[i],
      }));

      await prisma.data.createMany({ data: records });

      return {
        success: true,
        chunksStored: chunks.length,
      };

    } catch (error: any) {
      console.error("DataService.addDocument failed:", error.message);
      throw error; // let controller decide response
    }
  },
};
