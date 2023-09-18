<template>
  <div>{{ output.text }}</div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import OutputType = TpTerminal.OutputType;

interface OutputProps {
  output: OutputType;
}

const props = defineProps<OutputProps>();
const { output } = toRefs(props);
</script>

<style lang="scss"></style>
