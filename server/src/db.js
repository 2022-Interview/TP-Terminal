const { Sequelize } = require("sequelize");
const { db } = require("./config/getConfig");

/**
 * 创建数据库实例
 */
const sequelize = new Sequelize({
  database: db.database,
  username: db.username,
  password: db.password,
  host: db.host,
  port: db.port,
  dialect: "mysql",
  logging: console.log
});

// 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL client connected");
  })
  .catch((e) => {
    console.error("Unable to connect to MySQL", e);
  });

module.exports = sequelize;
