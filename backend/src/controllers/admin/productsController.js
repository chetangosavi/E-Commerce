import { imageUploadUtil } from "../../helpers/cloudinary.js";

export const hadndleImageUpload = async (req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = `data:${req.file.mimetype};base64,${b64}`;
        
        const result = await imageUploadUtil(url);

        res.status(200).json({ success: true, result, message: "Upload successful" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Error in server',
            success:false
        })
        
    }
}