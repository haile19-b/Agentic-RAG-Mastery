import pdf from "pdf-parse";
import mammoth from "mammoth";
import { chunkText } from "../../lib/chunk";
import { getGeminiEmbedding } from "../../lib/gemini.embedding";
import { data } from "../../config/mongoDB";

export const fileService = {
  async processFile(file: Express.Multer.File) {
    try {
      let text = "";

      // Detect file type
      if (file.mimetype === "application/pdf") {
        const parsed = await pdf(file.buffer);
        text = parsed.text;
      } 
      else if (
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const result = await mammoth.extractRawText({ buffer: file.buffer });
        text = result.value;
      }
      else if (file.mimetype === "text/plain") {
        text = file.buffer.toString("utf8");
      }
      else {
        return { success: false, error: "Unsupported file type" };
      }

      if (!text || text.length < 50) {
        return { success: false, error: "File has no usable text" };
      }

      // Chunk
      const chunks = await chunkText(text);

      // Embed
      const embeddings = await getGeminiEmbedding(chunks);

      if (chunks.length !== embeddings.length) {
        return { success: false, error: "Embedding mismatch" };
      }

      // Store
      const docs = chunks.map((chunk, i) => ({
        content: chunk,
        embedding: embeddings[i],
        source: file.originalname,
        uploadedAt: new Date()
      }));

      await data.insertMany(docs);

      return {
        success: true,
        file: file.originalname,
        chunksStored: docs.length
      };

    } catch (error: any) {
      console.error("File processing error:", error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};
