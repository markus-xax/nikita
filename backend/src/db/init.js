const fs = require('fs');
const path = require('path');
const { query, testConnection } = require('./connection');

/**
 * Инициализация базы данных - создание таблиц и схемы
 */
const initDatabase = async () => {
  try {
    // Проверяем подключение
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('Не удалось подключиться к базе данных');
    }

    // Читаем SQL файл со схемой
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

    // Выполняем SQL схему
    await query(schemaSQL);
    console.log('✅ Схема базы данных успешно создана');

    return true;
  } catch (error) {
    console.error('❌ Ошибка инициализации базы данных:', error);
    throw error;
  }
};

// Запуск инициализации БД из командной строки
if (require.main === module) {
  initDatabase()
    .then(() => {
      console.log('✅ База данных успешно инициализирована');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Ошибка инициализации базы данных:', error);
      process.exit(1);
    });
}

module.exports = {
  initDatabase,
};
