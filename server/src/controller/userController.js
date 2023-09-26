const { userRegister } = require("../service/userService");
/**
 * 用户注册 控制层
 * @param {请求对象} event
 * @returns
 */
async function userRegisterApi(event) {
  const { username, password, email } = event;
  if (!username || !password || !email) {
    console.log("参数错误");
  }
  return userRegister(username, password, email);
}

module.exports = {
  userRegisterApi
};
