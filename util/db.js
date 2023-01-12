import mongoose from 'mongoose';
import { SECRETS } from './config.js';

export const connectDatabase = async () => {
  try {
    const conn = await mongoose
      .set('strictQuery', false)
      .set('autoCreate', true)
      .set('autoIndex', true)
      .connect(SECRETS.mongo_uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}