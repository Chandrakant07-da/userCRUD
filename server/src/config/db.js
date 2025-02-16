/* eslint-disable no-undef */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cluster from 'cluster';

dotenv.config();

let instance = null; // Prevent multiple connections

const connectDB = async () => {
  if (!instance) {
    try {
      instance = await mongoose.connect(process.env.MONGO_URI);

      if (cluster.isMaster) {
        console.log('MongoDB Connected (Master)');
      } else {
        console.log(`MongoDB Connected (Worker ${process.pid})`);
      }
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Exit on failure
    }
  }
  return instance;
};

export default connectDB;
