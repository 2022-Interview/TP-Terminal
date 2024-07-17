<!-- 
  
网易云 API：https://neteasecloudmusicapi.js.org/#/?id=%e8%8e%b7%e5%8f%96%e7%94%a8%e6%88%b7%e8%af%a6%e6%83%85
Aplayer：https://aplayer.js.org/#/zh-Hans/?id=mse-%E6%94%AF%E6%8C%81
-->

<template>
  <div>
    <div ref="aplayer"></div>
    <div v-if="errorHint">{{ errorHint }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";
import { getSingleMusic } from "./musicApi";
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";

interface MusicBoxProps {
  name: string;
}

const props = withDefaults(defineProps<MusicBoxProps>(), {});
const { name } = toRefs(props);
const errorHint = ref("");
const aplayer = ref();

const audio = ref([]);

onMounted(async () => {
  const res: any = await getSingleMusic(name.value);
  if (typeof res.data === "string") {
    errorHint.value = res.data;
    return;
  }

  const { author, cover, id, mName, lrc } = res.data;
  console.log();

  audio.value.push({
    name: mName,
    artist: author.name,
    url: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
    cover,
    lrc
  });

  new APlayer({
    container: aplayer.value,
    lrcType: 1,
    audio: audio.value
  });
});
</script>

<style lang="scss">
.aplayer-title {
  color: #000;
}
</style>
import { stringify } from "querystring";
