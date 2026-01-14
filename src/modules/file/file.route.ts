import { Router } from "express";
import { FileController } from "./file.controller";
import { upload } from "../../config/multer";

const router = Router();

router.post("/upload", upload.single("file"), FileController.upload);

export default router;
