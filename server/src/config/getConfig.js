/**
 * 当前环境配置
 */
let config;
const env = process.env.NODE_ENV ?? "local";
if (env === "local") {
  config = require("./config");
} else {
  config = require(`./config.${env}`);
}

module.exports = config;
