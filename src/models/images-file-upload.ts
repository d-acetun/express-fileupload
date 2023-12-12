import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLODUNARY_API_SECRET,
});
class ImageFileUploadModel {
  static async upload(avatar: UploadedFile | UploadedFile[]) {
    //* Check if image is an array or a single file
    if (Array.isArray(avatar)) {
      //* Handle multiple files

      const imagesPath: string[] = [];
      for (let i = 0; i < avatar.length; i++) {
        const file: UploadedFile = avatar[i];
        const fileName = file.name;
        await file.mv(`./upload/${fileName}`);
        imagesPath.push(`./upload/${fileName}`);
      }
      return {
        message: "Imagenes subidas correctamente",
        path: imagesPath,
      };
    } else {
      //* Handle single file
      const file: UploadedFile = avatar;
      const fileName = file.name;
      await file.mv(`./upload/${fileName}`);
      return {
        message: "Imagenes subidas correctamente",
        path: `./upload/${fileName}`,
      };
    }
  }

  static async uploadCloudinary(avatar: UploadedFile | UploadedFile[]) {
    if (Array.isArray(avatar)) {
      //* Handle multiple files
      for (let i = 0; i < avatar.length; i++) {
        const file: UploadedFile = avatar[i];
        const buffer = file.data;
        const response = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "multi-uploads",
              },
              (error, result) => {
                if (error) reject(error);
                resolve(result);
              }
            )
            .end(buffer);
        });
        console.log("response: ", response);
      }
      return {
        message: "Imagenes subidas a cloudinary",
      };
    } else {
      const buffer = avatar.data;
      const response = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "upload",
            },
            (error, result) => {
              if (error) reject(error);
              resolve(result);
            }
          )
          .end(buffer);
      });
      console.log("response: ", response);
      return { message: "Imagen subida a cloudinary" };
    }
  }
}

export default ImageFileUploadModel;
