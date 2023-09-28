const GetError = require("../exception");
const {
  REQUEST_PARAMS_ERROR_CODE,
  NO_AUTH_ERROR_CODE
} = require("../exception/errorCode");
const {
  userRegister,
  userLogin,
  getUserInfo
} = require("../service/userService");
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

/**
 * 用户登录
 * @param {请求事件} event
 * @param {请求对象} req
 * @returns
 */
async function userLoginApi(event, req) {
  const { username, password } = event;
  if (!username || !password) {
    throw new GetError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  return await userLogin(username, password, req);
}

/**
 * 用户注销
 * @param {*} event
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function userLogoutApi(event, req) {
  if (!req.session.userInfo) {
    throw new GetError(NO_AUTH_ERROR_CODE, "未登录");
  }
  delete req.session.userInfo;
  return true;
}

/**
 * 获取用户信息
 * @param {*} event
 * @param {*} req
 * @returns
 */
async function userInfoApi(event, req) {
  if (!req.session.userInfo) {
    throw new GetError(NO_AUTH_ERROR_CODE, "未登录");
  }
  return getUserInfo(req);
}

module.exports = {
  userRegisterApi,
  userLoginApi,
  userLogoutApi,
  userInfoApi
};
