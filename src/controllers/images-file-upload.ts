import { Request, Response } from "express";
import ImageFileUploadModel from "../models/images-file-upload";

class ImagesFileUploadController {
  static async upload(req: Request, res: Response) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha subido ningún archivo");
    }


    // * Note that req.files.avatar is the name of the input field in the form
    const { avatar } = req.files;

    const uploadedImages = await ImageFileUploadModel.upload(avatar);
    res.status(200).json(uploadedImages);
  }

  static async uploadCloudinary(req: Request, res: Response) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha subido ningún archivo");
    }


    // * Note that req.files.avatar is the name of the input field in the form
    const { avatar } = req.files;

    const uploadedImages = await ImageFileUploadModel.uploadCloudinary(avatar);
    res.status(200).json(uploadedImages);
  }
}

export default ImagesFileUploadController;
