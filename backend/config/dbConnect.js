import mongoose from 'mongoose';

export const dbConnect = async () => {
    try {
        const conn= await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully.");
    }
    catch (error) {
        console.log(`Database error: ${error.message}`);
        process.exit(1);
    }
};