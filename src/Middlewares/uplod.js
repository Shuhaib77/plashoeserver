import cloudinary from "cloudinary";
import multer from "multer";
// import path from 'path';

//configcloudinary

cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api,
  api_secret: process.env.cloud_secret,
});

//setuping multer storge
const storage = multer.diskStorage({});

const uplod = multer({
  storage,
  limits: { fieldSize: 2000000000 }, //2gb
});

//middleware to handle upload

const uplodimage = (req, res, next) => {
  uplod.single("image")(req, res, async (error) => {
    // console.log(req.file.originalname,'sampleee');

    if (error) {
      return next(error);
    }

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        console.log(result, "sss");
        req.cloudinaryImageUrl = result.secure_url;
        console.log(result, "ddd");

        console.log(req.cloudinaryImageUrl, "kjwgcwjkc");
      } catch (error) {
        return next(error);
      }
    }
    next();
  });
};

export default uplodimage;
