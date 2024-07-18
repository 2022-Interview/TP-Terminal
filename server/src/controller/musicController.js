const MyError = require("../exception");

const {
  REQUEST_PARAMS_ERROR_CODE,
  NOT_FOUND_ERROR_CODE
} = require("../exception/errorCode");
const { getSingleMusic } = require("../service/musicService");
const { getLyric } = require("../third/neteaseMusicApi");

/**
 * 获取单首音乐
 * @param event
 * @param req
 * @param res
 */
async function getSingleMusicApi(event) {
  const { keywords } = event;

  if (!keywords) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "请输入关键词");
  }

  const song = await getSingleMusic(keywords);
  if (!song) {
    throw new MyError(NOT_FOUND_ERROR_CODE);
  }

  // 付費音乐提示
  if (song.privilege.freeTrialPrivilege.cannotListenReason !== null) {
    return "该歌曲需要付费哦！";
  }

  // 获取歌词
  const getLyricStr = await getLyric(song.id);
  if (getLyricStr.status !== 200) {
    return "获取歌词失败";
  }

  return {
    mName: song.name,
    id: song.id,
    author: song.ar[0],
    cover: song.al.picUrl,
    lrc: getLyricStr.body.lrc.lyric
  };
}

module.exports = {
  getSingleMusicApi
};
