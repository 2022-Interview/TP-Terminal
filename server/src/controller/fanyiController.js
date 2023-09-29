const GetError = require("../exception");

const { REQUEST_PARAMS_ERROR_CODE } = require("../exception/errorCode");
const { translate } = require("../third/baiduFanYI/baiduFanYiApi");

async function translateApi(event) {
  const { keywords, config } = event;
  if (!keywords) {
    throw new GetError(REQUEST_PARAMS_ERROR_CODE, "请输入关键词");
  }

  const result = await translate(keywords, config);
  return result;
}

module.exports = {
  translateApi
};
