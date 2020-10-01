const path = require("path");

if (process.env.NODE_ENV === "production") {
  require("./dist");
} else {
  require("nodemon")({ script: "dev.js" });
}
global.appRoot = path.resolve(__dirname);
