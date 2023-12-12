import { Router } from "express";
import ImageController from "../controllers/images-file-upload";
const imagesFileUploadRouter = Router();
import upload from "../libs/file-upload";

imagesFileUploadRouter.post("/upload", upload, ImageController.upload);
imagesFileUploadRouter.post("/upload-cloudinary", upload, ImageController.uploadCloudinary);
export default imagesFileUploadRouter;
