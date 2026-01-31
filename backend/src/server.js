const express = require("express");
const { PORT } = require("./config");
const { logRequest } = require("./utils/file-logger");
const { sum } = require("./modules/math");
const todosRouter = require("./routes/todos");
const prisma = require("./db/prisma");
const { connectRedis } = require("./db/redis");

const app = express();

// Middleware для парсинга JSON тела запроса
app.use(express.json());

// Middleware для логирования запросов
app.use((req, res, next) => {
  // Сохраняем оригинальные методы res.json и res.send для логирования
  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);
  let responseBody = null;

  res.json = function (data) {
    responseBody = JSON.stringify(data, null, 2);
    return originalJson(data);
  };

  res.send = function (data) {
    responseBody = typeof data === "string" ? data : JSON.stringify(data);
    return originalSend(data);
  };

  res.on("finish", () => {
    logRequest({
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      body: responseBody,
    });
  });

  next();
});

// Маршруты
app.get("/", (req, res) => {
  res.json({
    message: "Добро пожаловать в Backend Playground!",
    routes: ["/status", "/math/sample", "/echo"],
  });
});

app.get("/status", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    node: process.version,
  });
});

app.get("/math/sample", (req, res) => {
  res.json({
    description: "Пример использования собственного модуля math",
    expression: "sum(4, 7)",
    result: sum(4, 7),
  });
});

app.post("/echo", (req, res) => {
  res.json({
    youSent: req.body,
    type: typeof req.body,
    headers: req.headers,
  });
});

// Подключение роутера для задач
app.use("/todos", todosRouter);

// Обработка 404
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "Маршрут не реализован. Посмотри README для заданий.",
  });
});

// Обработка ошибок
app.use((error, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error("Ошибка сервера:", error);
  
  // Используем statusCode из ошибки, если он есть, иначе 500
  const statusCode = error.statusCode || 500;
  const errorName = error.name || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: errorName,
    message: error.message,
  });
});

// Инициализация и запуск сервера
const startServer = async () => {
  try {
    // Проверяем подключение к Prisma (PostgreSQL)
    await prisma.$connect();
    console.log('✅ Prisma подключен к PostgreSQL');
    
    // Подключаемся к Redis (не критично, если недоступен)
    await connectRedis();
    
    // Запускаем сервер
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
      console.log('📚 Используемые технологии:');
      console.log('   - PostgreSQL (через Prisma ORM)');
      console.log('   - Redis (для кеширования)');
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Ошибка при запуске сервера:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Получен сигнал SIGINT, завершаем работу...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Получен сигнал SIGTERM, завершаем работу...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();

