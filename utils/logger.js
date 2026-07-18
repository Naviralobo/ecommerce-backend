const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const path = require("path");

const logDirectory = path.join(__dirname, "..", "logs"); //create a logs directory in the place before using this so that it gets into "../logs"

//if the fie is not there it creates one
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}
//to delete files after certain period
const RETETION_DAYS = Number(process.env.LOG_RETENTION_DAYS) || 7;
const RETENTION_MS = RETENTION_DAYS * 24 * 60 * 60 * 1000;

function cleanupOldLogs() {
  if (!fs.existsSync(logDirectory)) return;

  const files = fs.readdirSync(logDirectory);
  const now = Date.now();

  files.forEach((file) => {
    const filePath = path.join(logDirectory, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && now - stat.mtimeMs > RETENTION_MS) {
      fs.unlinkSync(filepath);
      logger.info(`Deleted old log file: ${file}`);
    }
  });
}

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info", // Set the default log level
  //   combine just combines the details and print
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add timestamp to logs
    format.errors({ stack: true }), // Include stack trace for errors
    format.printf(({ timestamp, level, message }) => {
      let output = `${timestamp} [${level.toUpperCase()}]: ${message}`; // Format the log message
      if (Object.keys(meta).length > 0) {
        output += ` ${JSON.stringify(meta)}`;
      }
      if (stack) {
        output += `\nStack trace: ${stack}`;
      }
      return output;
    }),
  ),
  //colorize just differentiate info, warning and errors with colors

  transports: [
    new transports.Console({ format: format.colorize({ all: true }) }), // Log to the console
    new transports.File({
      filename: path.join(logDirectory, "app.log"),
      maxSize: 5 * 1024 * 1024, //once file reaches 5 mb it creates another file
      maxFiles: 5,
    }), // Log to a file named 'app.log'
  ],
});
// Notice that stream is not built into Winston. You're simply adding a new property to the logger object.
logger.stream = {
  write: (message) => logger.info(message.trim()),
};
module.exports = logger;
