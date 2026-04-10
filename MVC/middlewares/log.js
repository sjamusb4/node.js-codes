const fs = require("fs");
function logRequest(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `\n${new Date().toISOString()}:${req.ip} - ${req.method} ${req.originalUrl}\n`,
      (err) => {
        if (err) {
          console.error("Failed to log request:", err);
        }
        next();
      },
    );
  };
}

module.exports = logRequest;
