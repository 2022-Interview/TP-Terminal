const {
  cloudsearch,
  playlist_detail,
  check_music,
  lyric
} = require("NeteaseCloudMusicApi");

/**
 * 搜索音乐
 * @param keywords 关键词
 * @param limit 分页大小
 * @return {Promise<*[]>}
 */
async function searchMusics(keywords, limit = 10) {
  if (!keywords) {
    return [];
  }

  try {
    const result = await cloudsearch({
      keywords,
      type: 1,
      limit
    });

    if (result.status !== 200) {
      return [];
    }

    const songs = result.body.result.songs;
    return songs ? songs : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

/**
 * 检测音乐是否可用
 * @param {*} id 歌曲 id
 * @returns
 */
async function checkMusic(id) {
  if (!id) {
    return "";
  }
  return await check_music({
    id
  });
}

/**
 * 歌词
 * @param {*} id 获取歌词
 * @returns
 */
async function getLyric(id) {
  if (!id) {
    return "";
  }
  const res = await lyric({ id });
  return res;
}

async function playlistDetail(id) {
  if (!id) {
    return "";
  }
  // 热歌榜 id
  const HOT_SONGS_PLAY_LIST_ID = 3778678;
  const result = await playlist_detail({
    id: HOT_SONGS_PLAY_LIST_ID
  });

  return result;
}

module.exports = {
  searchMusics,
  playlistDetail,
  checkMusic,
  getLyric
};
