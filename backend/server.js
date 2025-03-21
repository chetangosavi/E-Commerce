import express from "express";
import cors from 'cors'
import dbConnet from "./src/config/dbConnect.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
dotenv.config()

dbConnet();

const app = express();

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorization','Cache-Control','Expires','Pragma'],
    credentials:true
}));
app.use(cookieParser());

import indexRouter from './src/routes/indexed.Routes.js'
app.use('/api',indexRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})