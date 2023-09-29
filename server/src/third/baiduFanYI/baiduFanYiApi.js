const axios = require("axios");
const { baiduFanYi } = require("../../config/getConfig");
const MD5 = require("./md5");
const appid = baiduFanYi?.appid;
const key = baiduFanYi?.key;
/**
 * 翻译
 * @param keywords
 * @param config
 */
async function translate(keywords, config) {
  if (!keywords) {
    return null;
  }

  const salt = new Date().getTime();
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  const from = config?.from ?? "auto";
  const to = config?.to ?? "auto";
  const sign = MD5(appid + keywords + salt + key);

  return await axios({
    method: "get",
    url: "http://api.fanyi.baidu.com/api/trans/vip/translate",
    params: {
      q: keywords,
      appid,
      salt,
      from,
      to,
      sign
    }
  }).then((res) => res.data);
}

module.exports = {
  translate
};
