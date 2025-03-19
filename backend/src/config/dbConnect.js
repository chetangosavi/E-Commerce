import mongoose from "mongoose";

const dbConnet = async()=>{
    try {
        await mongoose.connect(process.envv.MONGO_URI)
        console.log("Db Connected...")       
    } catch (error) {
        console.error({error:error.message})
    }
}

export default dbConnet;