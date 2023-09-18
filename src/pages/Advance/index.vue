<template>
  <tp-terminal ref="terminalRef" :on-submit-command="onSubmitCommand" />
</template>

<script setup lang="ts">
import { doCommandExecute } from "@/core/commandExecutor";
import { ref } from "vue";

const terminalRef = ref();

const onSubmitCommand = (inputText: string) => {
  if (!inputText) return;

  const terminal = terminalRef.value.terminal;
  // 命令解析
  doCommandExecute(inputText, terminal);
};
</script>

<style lang="scss"></style>
