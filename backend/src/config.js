const path = require("path");

const PORT = Number(process.env.PORT) || 3000;
const ROOT_DIR = path.resolve(__dirname, "..");
const LOG_DIR = path.join(ROOT_DIR, "logs");

module.exports = {
  PORT,
  ROOT_DIR,
  LOG_DIR,
};

