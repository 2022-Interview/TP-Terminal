<template>
  <div>
    <a-menu
      theme="dark"
      v-model:selectedKeys="current"
      mode="horizontal"
      v-if="false"
    >
      <a-menu-item key="mail">
        <template #icon>
          <FundViewOutlined />
        </template>
        可视化
      </a-menu-item>
      <a-menu-item key="app">
        <template #icon>
          <BugOutlined />
        </template>
        终端模式
      </a-menu-item>
    </a-menu>

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { FundViewOutlined, BugOutlined } from "@ant-design/icons-vue";
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
</style>
