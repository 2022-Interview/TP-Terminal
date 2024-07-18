<template>
  <div>
    <a-menu
      v-model:selectedKeys="current"
      mode="horizontal"
      theme="dark"
      @click="handleClick"
    >
      <a-menu-item key="visual" disabled>
        <template #icon>
          <FundViewOutlined />
        </template>
        视图
      </a-menu-item>
      <a-menu-item key="command">
        <template #icon>
          <BugOutlined />
        </template>
        终端
      </a-menu-item>
    </a-menu>

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { FundViewOutlined, BugOutlined } from "@ant-design/icons-vue";

const router = useRouter();
const current = ref<string[]>(["command"]);

onMounted(() => {
  router.push("/command");
});

const handleClick = (e) => {
  switch (e.key) {
    case "visual":
      router.push("/");
      break;
    case "command":
      router.push("/command");
      break;
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
</style>
