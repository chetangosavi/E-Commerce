import express from 'express'
import { authMiddleware, login, register } from '../controllers/auth/auth.controller.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/check-auth',authMiddleware,(req,res)=>{
    const user = req.user
    return res.status(200).json({
        success: true,
        message:'Authenticated User',
        user
    })
})

export default router;