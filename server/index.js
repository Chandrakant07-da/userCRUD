/* eslint-disable no-undef */
import express from 'express';
import cluster from 'cluster';
import os from 'os';
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import dotenv from 'dotenv';



dotenv.config();

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  connectDB(); // Only master connects to MongoDB initially

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  app.use(express.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
  app.use('/api', userRoutes);
  app.use("/",(err,req,res,next)=>{
    res.status(500).json({message:err.message});
  });
  connectDB(); // Workers will reuse the same connection

  app.listen(5000, () => console.log(`Worker ${process.pid} started`));
}
