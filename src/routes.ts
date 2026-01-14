import { Router } from "express";
import dataRoute from "./modules/data/data.routes"
import askRoute from "./modules/request/request.routes"
import fileRoute from "./modules/file/file.route"

export const router = Router();

router.use("/data",dataRoute)
router.use("/data",askRoute)
router.use("/file",fileRoute)

export default router