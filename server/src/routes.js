/**
 * 接口路由
 */
const routes = [
  {
    path: "/user/register",
    handler: require("./controller/userController").userRegisterApi
  }
];

module.exports = routes;
