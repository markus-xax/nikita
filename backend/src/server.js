const express = require("express");
const { PORT } = require("./config");
const { logRequest } = require("./utils/file-logger");
const { sum } = require("./modules/math");

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
  res.status(500).json({
    error: "Internal Server Error",
    message: error.message,
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});

