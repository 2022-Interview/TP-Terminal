/**
 * 接口路由
 */
const routes = [
  {
    path: "/user/info",
    handler: require("./controller/userController").userInfoApi
  }
];

module.exports = routes;
