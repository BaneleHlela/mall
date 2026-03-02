import Redis from "ioredis"

export const redis = new Redis("rediss://default:ATynAAIncDFlZDIwNzIyOTE5NTE0NzA0ODlkMmY2ZWY0NTVhNmU3OXAxMTU1Mjc@probable-mallard-15527.upstash.io:6379");
await redis.set('foo', 'bar');