import { Request, Response } from "express"
import { dataSchema } from "./data.schema";
import { dataService } from "./data.service";

export const dataController = {
    async add(req: Request, res: Response) {
        try {
            const data = dataSchema.parse(req.body);
            const result = await dataService.addDocument(data.userData);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}