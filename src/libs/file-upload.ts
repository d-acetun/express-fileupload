import fileUpload from "express-fileupload";

// Note that this option available for versions 1.0.0 and newer.
const upload = fileUpload({
  useTempFiles: true,
  tempFileDir: "./tmp",
});

export default upload;
