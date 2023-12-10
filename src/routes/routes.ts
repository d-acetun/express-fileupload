import { Router } from "express";

import imagesFileUploadRouter from "./images-file-upload";
const router = Router();

router.use("/images-fileUpload", imagesFileUploadRouter);

export default router;
