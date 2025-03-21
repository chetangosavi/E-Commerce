import express from 'express';
import { hadndleImageUpload } from '../../controllers/admin/productsController.js';
import { upload } from '../../helpers/cloudinary.js';

const router =express.Router();

router.post('/upload-image',upload.single('my_file'),hadndleImageUpload);

export default router

