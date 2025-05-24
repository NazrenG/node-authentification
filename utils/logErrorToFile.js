import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, "../error_log.txt");

export function logErrorToFile(error) {
  const logMessage = `${new Date().toISOString()} - ${error.status || 500} - ${
    error.message || error
  }\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write to error log:", err);
    }
  });
}

export function logErrorToFileWithStack(message, status = 500) {
  const error = new Error(message);
  error.status = status;

  const logMessage = `${new Date().toISOString()} - ${status} - ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write to error log:", err);
    }
  });
}
