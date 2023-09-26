/**
 * 默认配置
 */
const config = {
  redis: {
    host: "localhost",
    port: "6379",
    password: "123456",
    db: 2
  },
  // mysql 配置
  db: {
    database: "tpterminal",
    username: "tproot",
    password: "123456",
    host: "localhost",
    port: 3306
  },
  // 百度翻译配置
  baiduFanYi: {
    appid: "20221013001389353",
    key: "qW7y36yPzKYwOdQAujn3"
  }
};
module.exports = config;
