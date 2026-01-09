import { Router } from "express";
import dataRoute from "./modules/data/data.routes"
import askRoute from "./modules/request/request.routes"

export const router = Router();

router.use("/data",dataRoute)
router.use("/data",askRoute)

export default router