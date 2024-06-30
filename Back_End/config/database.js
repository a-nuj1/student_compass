import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connection.host}`);
    } catch (err) {
        console.error(`MongoDB connection error:, ${err}`);
        process.exit(1);
    }
};
