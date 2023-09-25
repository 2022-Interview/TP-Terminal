const { userInfo } = require("../service/userService");

async function userInfoApi() {
  return userInfo();
}

module.exports = {
  userInfoApi
};
