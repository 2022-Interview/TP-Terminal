const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
// 请求大小限制
const requestLimit = "5120kb";

class ExpressServer {
  constructor() {
    this.app = express();
    this.baseUrl = "/api";
    this.server = null;
    this.init();
  }

  init() {
    this.app.use(
      bodyParser.urlencoded({ extended: false, limit: requestLimit })
    );
    this.app.use(bodyParser.json({ limit: requestLimit }));
    this.app.set("x-powered-by", false);
    this.server = http.createServer(this.app);
  }

  setRoute(path, handlerFunction) {
    const handler = async (req, res) => {
      let result;
      result = await handlerFunction();

      res.send(result);
    };
    this.app.get(this.baseUrl + path, handler);
    // this.app.post(this.baseUrl + path, handler);
  }

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
