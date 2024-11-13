
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`DataBase connected. Host: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`MongoDB connection failed with ${error}`);
        process.exit(1);
    }
}

export {connectDB};