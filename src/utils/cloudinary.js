import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uplodeOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // uplode the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            // in curly braces these are cloudinary options on cloudinary documentation
            resource_type: "auto"
        })
        // file has been uploaded successfully and checking the url of the uploded file
        console.log("File is successfully uploaded on Cloudinary ", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export { uplodeOnCloudinary };
// cloudinary.v2.uploader
//   .upload("/home/my_image.jpg")
//   .then(result => console.log(result))
//   .catch(error => console.error(error));