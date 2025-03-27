import express from 'express'
import authRouter from './auth.Routes.js'
const router = express.Router();


import productRouter from './admin/products.Routes.js'
router.use('/auth',authRouter);
router.use('/admin',productRouter)

export default router; 