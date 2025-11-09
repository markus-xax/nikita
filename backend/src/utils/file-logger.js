const fs = require("fs");
const path = require("path");
const { LOG_DIR } = require("../config");

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function logRequest({ method, url, statusCode, timestamp = new Date(), body }) {
  ensureLogDir();
  const logFile = path.join(LOG_DIR, "requests.log");
  const line = JSON.stringify(
    {
      time: timestamp.toISOString(),
      method,
      url,
      statusCode,
      bodyLength: body ? Buffer.byteLength(body) : 0,
    },
  );

  fs.appendFile(logFile, `${line}\n`, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error("Не удалось записать лог:", error);
    }
  });
}

module.exports = {
  logRequest,
};

