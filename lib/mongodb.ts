import mongoose from 'mongoose';

type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

declare global { var mongooseCache: Cache | undefined; }

const cache: Cache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) global.mongooseCache = cache;

export async function connectDB() {
  if (cache.conn) return cache.conn;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Please add MONGODB_URI to your environment variables.');
  cache.promise = cache.promise || mongoose.connect(uri, { dbName: process.env.MONGODB_DB || 'mini-commerce' });
  cache.conn = await cache.promise;
  return cache.conn;
}
