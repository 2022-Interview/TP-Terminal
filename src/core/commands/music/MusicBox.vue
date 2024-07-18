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
