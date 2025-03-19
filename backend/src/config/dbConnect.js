import mongoose from "mongoose";

const dbConnet = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Db Connected...")       
    } catch (error) {
        console.error({error:error.message})
    }
}

export default dbConnet;