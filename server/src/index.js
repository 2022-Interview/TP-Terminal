const routes = require("./routes");
const { CloudBaseRunServer } = require("./server");

const server = new CloudBaseRunServer();

// 注册接口路由
for (const route of routes) {
  server.setRoute(route.path, route.handler);
}
server.listen(7354);
