const path = require("path");

const PORT = Number(process.env.PORT) || 4000;
const ROOT_DIR = path.resolve(__dirname, "..");
const LOG_DIR = path.join(ROOT_DIR, "logs");

// Настройки PostgreSQL (для Prisma)
const DATABASE_URL = process.env.DATABASE_URL || 
  `postgresql://${process.env.DB_USER || "postgres"}:${process.env.DB_PASSWORD || "postgres"}@${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || "nikita_db"}?schema=public`;

// Настройки Redis
const REDIS_CONFIG = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  db: Number(process.env.REDIS_DB) || 0,
};

// URL для подключения к Redis
const REDIS_URL = process.env.REDIS_URL || `redis://${REDIS_CONFIG.host}:${REDIS_CONFIG.port}/${REDIS_CONFIG.db}`;

module.exports = {
  PORT,
  ROOT_DIR,
  LOG_DIR,
  DATABASE_URL,
  REDIS_CONFIG,
  REDIS_URL,
};

