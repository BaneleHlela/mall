import Redis from "ioredis";
import dotenv from "dotenv";

// server.js's route imports (which transitively reach this module) are evaluated
// before server.js's own dotenv.config() call, per ESM import-hoisting semantics -
// this file must load its own env vars rather than depend on that later call.
dotenv.config();

export const redis = new Redis(process.env.REDIS_URL);
