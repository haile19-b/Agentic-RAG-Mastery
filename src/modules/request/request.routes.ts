import { Router } from "express";
import { RequestController } from "./request.controller";

const router = Router();

router.post("/ask",RequestController.findRelevantData)

export default router