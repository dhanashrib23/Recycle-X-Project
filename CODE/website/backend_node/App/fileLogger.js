const morgan = require("morgan");
const fs = require("node:fs");

const morganFormat = ":method :url :status :response-time ms";

const appendFileLogs = morgan(morganFormat, {
  stream: {
    write: (message) => {
      const logObject = {
        method: message.split(" ")[0],
        url: message.split(" ")[1],
        status: message.split(" ")[2],
        responseTime: message.split(" ")[3],
      };
      fs.appendFile(
        "App/access.log",
        JSON.stringify(logObject) + "\n",
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    },
  },
});

module.exports = { appendFileLogs };
