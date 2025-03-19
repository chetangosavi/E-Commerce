import express from "express";
import cors from 'cors'
import dbConnet from "./src/config/dbConnect";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
dotenv.config()
dbConnet();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api',indexedRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})