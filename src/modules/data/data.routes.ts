import { Router } from "express";
import { dataController } from "./data.controller";

const router = Router();

router.post("/add-data",dataController.add)

export default router