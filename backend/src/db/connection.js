const { Pool } = require('pg');
const { DB_CONFIG } = require('../config');

// Создаем пул соединений с PostgreSQL
const pool = new Pool(DB_CONFIG);

// Обработка ошибок пула
pool.on('error', (err) => {
  console.error('Неожиданная ошибка на неактивном клиенте PostgreSQL', err);
  process.exit(-1);
});

// Функция для проверки подключения
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Подключение к PostgreSQL успешно установлено');
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Ошибка подключения к PostgreSQL:', error.message);
    return false;
  }
};

// Функция для выполнения запросов
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Выполнен запрос', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Ошибка выполнения запроса:', error);
    throw error;
  }
};

// Функция для получения клиента из пула (для транзакций)
const getClient = async () => {
  const client = await pool.connect();
  const query = client.query.bind(client);
  const release = client.release.bind(client);
  
  // Устанавливаем таймаут для автоматического освобождения клиента
  const timeout = setTimeout(() => {
    console.error('Клиент не был освобожден в течение 5 секунд');
    console.error(new Error().stack);
  }, 5000);
  
  client.release = () => {
    clearTimeout(timeout);
    return release();
  };
  
  return client;
};

module.exports = {
  pool,
  query,
  getClient,
  testConnection,
};
