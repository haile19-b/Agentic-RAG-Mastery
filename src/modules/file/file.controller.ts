import { Request, Response } from "express";
import { fileService } from "./file.service";

export const FileController = {
  async upload(req: Request, res: Response) {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ success: false, error: "No file uploaded" });
      }

      const result = await fileService.processFile(file);

      return res.status(200).json(result);

    } catch (error: any) {
      console.error("File upload error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }
};
