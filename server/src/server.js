const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const GetError = require("./exception");
// 请求大小限制
const requestLimit = "5120kb";

const { redisConfig } = require("./config/getConfig");
const expressSession = require("express-session");
const redisPack = require("redis");
const RedisStore = require("connect-redis").default;
// console.log("=-=-=-000000", RedisStore);
// 创建redis连接
const redisClient = redisPack.createClient(redisConfig);
redisClient.on("connect", function () {
  console.log("Redis client connected");
});
redisClient.on("error", function (e) {
  console.error("--======", e);
});

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

    // 设置Express的Session存储中间件(跟之前session设置方法一样，只加了store项为redis存储)
    const sessionOptions = {
      // store session存储实例，默认为一个新的 MemoryStore 实例。
      store: new RedisStore({ client: redisClient }), // 只需设置这个就可存储到redis
      name: "session_id", // 默认connect.sid
      secret: "TP", // 设置签名秘钥  内容可以任意填写
      resave: false, // 强制保存，如果session没有被修改也要重新保存,默认true(推荐false)
      saveUninitialized: true, // 如果原先没有session那么就设置，否则不设置(推荐true)
      rolling: true, // 每次请求更新有效时长
      cookie: {
        // domain: ".yuindex.com", // 需要共享 cookie 时再设置
        // 全局设置 cookie，就是访问随便 api 就会设置 cookie，也可以在登录的路由下单独设置
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 天后过期
        httpOnly: true // 是否允许客户端修改 cookie（默认 true 不能被修改）
      }
    };
    this.app.use(expressSession(sessionOptions));

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
        console.error(
          `req error path = ${
            req.path
          }, clientIp = void 0, params = ${JSON.stringify(event)}`,
          error
        );
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
