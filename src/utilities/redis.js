import Redis from "ioredis"
import dotenv from "dotenv"

dotenv.config();

export const redis = new Redis({
    host: 'redis-12820.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
    port: 12820,
    username: 'default',
    password: process.env.REDIS_PASSWORD,  // Use your actual password
  });

  console.log(redis instanceof Redis);

export default redis;