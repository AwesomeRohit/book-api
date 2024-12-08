import Redis from "ioredis"
import dotenv from "dotenv"

dotenv.config();

export const redis = new Redis({
    host: 'redis-18117.c330.asia-south1-1.gce.redns.redis-cloud.com',
    port: 18117,
    username: 'student',
    password: process.env.REDIS_PASSWORD,  // Use your actual password
  });
console.log(redis instanceof Redis);

export default redis;