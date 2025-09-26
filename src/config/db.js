import mongoose from "mongoose";

const connectDB = async () => {
    // 1. Get the URI from the environment variable
    const uri = process.env.MONGO_URI; 

    if (!uri) {
        throw new Error("MONGO_URI not found in environment variables. Did you load your .env file?");
    }

    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        // Exit process with failure
        process.exit(1); 
    }
};

export default connectDB;