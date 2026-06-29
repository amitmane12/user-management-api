import mongoose from "mongoose";
import { env } from "../../config/env.config";

const connectDatabase = async () => {
    try {
        const mongoUri = env.MONGODB_URI;
        const dbName = env.DB_NAME;
        const dbInstance = await mongoose.connect(mongoUri, { dbName });
        console.log(`✅ DB connected successfully !`);
        console.log(`DB_NAME: ${dbInstance.connection.name}`);
        console.log(`Db-Host : ${dbInstance.connection.host}`);
    } catch (error) {
        console.log("❌ Database connection failed !!");
        console.log("error: ", error);
        throw error;
    }
};

export default connectDatabase;
