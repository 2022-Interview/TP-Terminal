/**
 * 接口路由
 */
const routes = [
  {
    path: "/user/register",
    handler: require("./controller/userController").userRegisterApi
  },
  {
    path: "/user/login",
    handler: require("./controller/userController").userLoginApi
  },
  {
    path: "/user/logout",
    handler: require("./controller/userController").userLogoutApi
  },
  {
    path: "/user/info",
    handler: require("./controller/userController").userInfoApi
  },
  {
    path: "/fanyi/translate",
    handler: require("./controller/fanyiController").translateApi
  },
  {
    path: "/music/get",
    handler: require("./controller/musicController").getSingleMusicApi
  }
];

module.exports = routes;
