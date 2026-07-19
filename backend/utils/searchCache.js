import { redis } from '../config/redis.js';

const DEFAULT_TTL_SECONDS = 60;

// Normalized cache key from a resource name + sorted, non-empty query params,
// so equivalent requests (regardless of param order) share one cache entry.
export const buildCacheKey = (resource, params) => {
  const parts = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`);
  return `search:${resource}:${parts.join('&')}`;
};

// Cache-aside, fail-open: any Redis error just falls through to fetchFn rather
// than breaking the request - a Redis outage should degrade search, not 500 it.
export const getOrSetCache = async (key, fetchFn, ttlSeconds = DEFAULT_TTL_SECONDS) => {
  try {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);
  } catch (err) {
    console.error('Redis read failed, bypassing cache:', err.message);
  }

  const fresh = await fetchFn();

  try {
    await redis.set(key, JSON.stringify(fresh), 'EX', ttlSeconds);
  } catch (err) {
    console.error('Redis write failed:', err.message);
  }

  return fresh;
};
