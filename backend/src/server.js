const http = require("http");
const { PORT } = require("./config");
const { logRequest } = require("./utils/file-logger");
const { sum } = require("./modules/math");

function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data, null, 2);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
  return body;
}

function collectRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      const rawBody = Buffer.concat(chunks).toString();
      if (!rawBody) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch {
        resolve(rawBody);
      }
    });

    req.on("error", reject);
  });
} 

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  let responseBody;
  let statusCode = 200;

  try {
    if (method === "GET" && url === "/") {
      responseBody = sendJson(res, 200, {
        message: "Добро пожаловать в Backend Playground!",
        routes: ["/status", "/math/sample", "/echo"],
      });
    } else if (method === "GET" && url === "/status") {
      responseBody = sendJson(res, 200, {
        status: "ok",
        uptime: process.uptime(),
        node: process.version,
      });
    } else if (method === "GET" && url === "/math/sample") {
      responseBody = sendJson(res, 200, {
        description: "Пример использования собственного модуля math",
        expression: "sum(4, 7)",
        result: sum(4, 7),
      });
    } else if (method === "POST" && url === "/echo") {
      const payload = await collectRequestBody(req);
      responseBody = sendJson(res, 200, {
        youSent: payload,
        type: typeof payload,
      });
    } else {
      statusCode = 404;
      responseBody = sendJson(res, statusCode, {
        error: "Not Found",
        message: "Маршрут не реализован. Посмотри README для заданий.",
      });
    }
  } catch (error) {
    statusCode = 500;
    // eslint-disable-next-line no-console
    console.error("Ошибка сервера:", error);
    responseBody = sendJson(res, statusCode, {
      error: "Internal Server Error",
      message: error.message,
    });
  } finally {
    logRequest({
      method,
      url,
      statusCode,
      body: responseBody,
    });
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});

