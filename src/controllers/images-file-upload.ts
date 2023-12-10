import { Request, Response } from "express";
import ImageFileUploadModel from "../models/images-file-upload";
import { UploadedFile } from "express-fileupload";

class ImagesFileUploadController {
  static async upload(req: Request, res: Response) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha subido ningún archivo");
    }


    // * Note that req.files.avatar is the name of the input field in the form
    const { avatar } = req.files;

    //* Check if image is an array or a single file
    if (Array.isArray(avatar)) {
      //* Handle multiple files

      for (let i = 0; i < avatar.length; i++) {
        const file: UploadedFile = avatar[i];
        const fileName = file.name;
        await file.mv(`./tmp/${fileName}`);
      }
    } else {
      //* Handle single file
      const file: UploadedFile = avatar;
      const fileName = file.name;
      await file.mv(`./tmp/${fileName}`);
    }

    const uploadedImages = await ImageFileUploadModel.upload();
    res.status(200).json(uploadedImages);
  }
}

export default ImagesFileUploadController;
