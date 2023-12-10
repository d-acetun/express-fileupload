import { Router } from "express";
import ImageController from "../controllers/images-file-upload";
const imagesFileUploadRouter = Router();
import upload from "../libs/file-upload";

imagesFileUploadRouter.post("/upload", upload, ImageController.upload);
export default imagesFileUploadRouter;
