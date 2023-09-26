const GetError = require("../exception");
const { REQUEST_PARAMS_ERROR_CODE } = require("../exception/errorCode");
const md5 = require("md5");
const UserModel = require("../model/user");
const { Op } = require("sequelize");

const regEmail =
  /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
// 密码加盐
const SALT = "coder_tpsoleil";

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

module.exports = {
  userRegister
};
