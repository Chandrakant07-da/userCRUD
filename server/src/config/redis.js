/* eslint-disable no-undef */
import Redis from 'ioredis';
import cluster from 'cluster';
import dotenv from 'dotenv';

dotenv.config();

let redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

if (cluster.isMaster) {
  redisClient.on('connect', () => console.log('Connected to Redis (Master)'));
} else {
  redisClient.on('connect', () => console.log(`Worker ${process.pid} connected to Redis`));
}

redisClient.on('error', (err) => console.error(`Redis error in process ${process.pid}:`, err));

export default redisClient;
