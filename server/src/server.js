const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const GetError = require("./exception");
// 请求大小限制
const requestLimit = "5120kb";

class ExpressServer {
  constructor() {
    this.app = express();
    this.baseUrl = "/api";
    this.server = null;
    this.init();
  }

  // 初始化服务
  init() {
    this.app.use(
      bodyParser.urlencoded({ extended: false, limit: requestLimit })
    );
    this.app.use(bodyParser.json({ limit: requestLimit }));
    this.app.set("x-powered-by", false);

    this.app.all("*", (req, res, next) => {
      // 开启跨域
      res.setHeader("Access-Control-Allow-Credentials", "true");
      const origin = req.get("Origin");
      // 允许的地址 http://127.0.0.1:9000 这样的格式
      if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      // 允许跨域请求的方法
      res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, OPTIONS, DELETE, PUT"
      );
      // 允许跨域请求 header 携带哪些东西
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since"
      );
      next();
    });

    this.server = http.createServer(this.app);
  }

  // 设置路由
  setRoute(path, handlerFunction) {
    const handler = async (req, res) => {
      const event = req.body;
      let result;
      try {
        result = await handlerFunction(event, req, res);
        result = {
          code: 200,
          data: result
        };
      } catch (error) {
        if (error instanceof GetError) {
          result = {
            code: error.code,
            message: error.message,
            data: null
          };
        } else {
          result = {
            code: 500,
            message: "server error",
            data: null
          };
        }
      }

      res.send(result);
    };
    this.app.post(this.baseUrl + path, handler);
  }

  // 开启监听服务
  listen(port) {
    this.server.listen(port);
    let url = `http://localhost:${port}`;
    if (this.contextPath) {
      url += this.contextPath;
    }
    console.log(`server start at ${url}, env = ${process.env.NODE_ENV}`);
  }
}

module.exports.CloudBaseRunServer = ExpressServer;
