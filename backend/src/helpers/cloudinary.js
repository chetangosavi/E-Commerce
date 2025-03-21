import cloudinary from 'cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config();

// configuring cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

console.log("pass",process.env.CLOUDINARY_API_KEY)

//creating storage using multer
const storage = new multer.memoryStorage();

//function to handle image upload
export async function imageUploadUtil(file) {
    console.log("file uploaded",file)
    const result = await cloudinary.uploader.upload(file,{
        resource_type:'auto'
    });

    return result;
}

// multer middleware
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
})



