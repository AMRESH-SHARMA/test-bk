import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.set('strictQuery', false).connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}