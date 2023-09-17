<template>
  <tp-terminal :on-submit-command="onSubmitCommand" />
</template>

<script setup lang="ts">
const onSubmitCommand = (inputText: string) => {
  console.log(inputText);
};
</script>

<style lang="scss"></style>
