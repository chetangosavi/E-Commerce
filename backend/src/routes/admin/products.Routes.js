import express from 'express';
import { addProduct, deleteProduct, getAllProducts, hadndleImageUpload, updateProduct } from '../../controllers/admin/productsController.js';
import { upload } from '../../helpers/cloudinary.js';

const router =express.Router();

router.post('/upload-image',upload.single('my_file'),hadndleImageUpload);

router.post('/add',addProduct);
router.get('/all/products',getAllProducts);
router.put('/updat/:id',updateProduct);
router.delete('/delete/:id',deleteProduct);

export default router

