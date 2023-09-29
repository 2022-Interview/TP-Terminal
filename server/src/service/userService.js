const GetError = require("../exception");
const {
  REQUEST_PARAMS_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  NO_AUTH_ERROR_CODE
} = require("../exception/errorCode");
const md5 = require("md5");
const UserModel = require("../model/user");
const { Op } = require("sequelize");

const regEmail =
  /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
// 密码加盐
const SALT = "coder_tpsoleil";
/**
 * 用户注册
 * @param {用户名} username
 * @param {密码} password
 * @param {邮箱} email
 * @returns
 */
async function userRegister(username, password, email) {
  console.log(username, password, email);
  if (!username || !password || !email) {
    throw new GetError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  if (username > 32) {
    throw new GetError(REQUEST_PARAMS_ERROR_CODE, "用户名过长");
  }
  if (!regEmail.test(email)) {
    throw new GetError(REQUEST_PARAMS_ERROR_CODE, "邮箱非法");
  }

  // 查看用户是否存在
  let user = await UserModel.findOne({
    where: {
      [Op.or]: [{ username }, { email }]
    }
  });
  if (user) {
    throw new GetError(REQUEST_PARAMS_ERROR_CODE, "该用户名或邮箱已注册");
  }
  // 插入新用户
  const cryptoPassword = md5(password + SALT);
  user = await UserModel.create({
    username,
    password: cryptoPassword,
    email
  });
  return user.id;
}

/**
 * 用户登录
 * @param {用户名} username
 * @param {密码} password
 * @param {请求} req
 */
async function userLogin(username, password, req) {
  // 校验
  if (!username || !password) {
    throw new GetError(REQUEST_PARAMS_ERROR_CODE, "参数错误");
  }
  const cryptoPassword = md5(password + SALT);
  // 用户是否已存在
  let user = await UserModel.findOne({
    attributes: { exclude: ["password"] },
    where: {
      username,
      password: cryptoPassword
    }
  });
  if (!user) {
    throw new GetError(NOT_FOUND_ERROR_CODE, "用户不存在或密码错误");
  }
  console.log("=----====", req.session);
  // 登录成功
  req.session.userInfo = user;
  return user;
}

/**
 * 获取当前用户信息
 * @param {请求对象} req
 * @returns
 */
async function getUserInfo(req) {
  const { userInfo } = req.session;
  if (!userInfo.id) {
    throw new GetError(NO_AUTH_ERROR_CODE, "未登录");
  }
  const currentUser = await UserModel.findByPk(userInfo.id);
  // 检查用户是否合法
  if (!currentUser) {
    throw new GetError(NOT_FOUND_ERROR_CODE, "找不到该用户");
  }
  return currentUser;
}

module.exports = {
  userRegister,
  userLogin,
  getUserInfo
};
