const { createClient } = require('redis');
const { REDIS_URL, REDIS_CONFIG } = require('../config');

// Создаем клиент Redis
const redisClient = createClient({
  url: REDIS_URL,
  socket: {
    host: REDIS_CONFIG.host,
    port: REDIS_CONFIG.port,
  },
  password: REDIS_CONFIG.password,
});

// Обработка ошибок подключения
redisClient.on('error', (err) => {
  console.error('❌ Ошибка Redis:', err);
});

redisClient.on('connect', () => {
  console.log('🔄 Подключение к Redis...');
});

redisClient.on('ready', () => {
  console.log('✅ Redis подключен и готов к работе');
});

redisClient.on('end', () => {
  console.log('🔌 Соединение с Redis закрыто');
});

// Функция для подключения к Redis
const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('✅ Подключение к Redis успешно установлено');
    }
    return true;
  } catch (error) {
    console.error('❌ Ошибка подключения к Redis:', error.message);
    // Не прерываем работу приложения, если Redis недоступен
    // В продакшене можно добавить fallback логику
    return false;
  }
};

// Функция для отключения от Redis
const disconnectRedis = async () => {
  try {
    if (redisClient.isOpen) {
      await redisClient.disconnect();
      console.log('✅ Отключение от Redis выполнено');
    }
  } catch (error) {
    console.error('❌ Ошибка при отключении от Redis:', error);
  }
};

// Вспомогательные функции для работы с кешем

/**
 * Получить значение из кеша
 */
const getCache = async (key) => {
  try {
    if (!redisClient.isOpen) {
      return null;
    }
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Ошибка получения из кеша (ключ: ${key}):`, error);
    return null;
  }
};

/**
 * Сохранить значение в кеш
 * @param {string} key - Ключ кеша
 * @param {any} value - Значение для сохранения
 * @param {number} ttl - Время жизни в секундах (по умолчанию 3600 = 1 час)
 */
const setCache = async (key, value, ttl = 3600) => {
  try {
    if (!redisClient.isOpen) {
      return false;
    }
    await redisClient.setEx(key, ttl, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Ошибка сохранения в кеш (ключ: ${key}):`, error);
    return false;
  }
};

/**
 * Удалить значение из кеша
 */
const deleteCache = async (key) => {
  try {
    if (!redisClient.isOpen) {
      return false;
    }
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error(`Ошибка удаления из кеша (ключ: ${key}):`, error);
    return false;
  }
};

/**
 * Удалить все ключи по паттерну
 */
const deleteCachePattern = async (pattern) => {
  try {
    if (!redisClient.isOpen) {
      return false;
    }
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
    return true;
  } catch (error) {
    console.error(`Ошибка удаления по паттерну (${pattern}):`, error);
    return false;
  }
};

module.exports = {
  redisClient,
  connectRedis,
  disconnectRedis,
  getCache,
  setCache,
  deleteCache,
  deleteCachePattern,
};
