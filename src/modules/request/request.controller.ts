import { Request, Response } from "express";
import { userSchema } from "./request.schema";
import { requestService } from "./request.service";

export const RequestController = {
  async findRelevantData(req: Request, res: Response) {
    try {
      const body = userSchema.parse(req.body);

      const result = await requestService.getRelevantData(body.userInput);

      if (!result.success) {
        return res.status(400).json(result);
      }

      return res.status(200).json(result);

    } catch (error: any) {
      console.error("RequestController.findRelevantData error:", error);

      return res.status(500).json({
        success: false,
        error: error.message || "Internal server error.",
      });
    }
  },
};
