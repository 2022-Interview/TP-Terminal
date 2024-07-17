<template>
  <div class="content-output">
    <template v-if="output.type === 'text'">
      <a-tag v-if="outputTagColor" :color="outputTagColor">
        <template #icon> <CheckCircleOutlined /> </template>
        {{ output.status }}
      </a-tag>
      <span v-if="output.type === 'text'" v-html="linkText(output.text)"></span>
    </template>
    <component
      v-if="output.type === 'component'"
      :is="output.component"
      v-bind="output.props ?? {}"
    ></component>
  </div>
</template>

<script setup lang="ts">
// import { CheckCircleOutlined } from "@ant-design/icons-vue";
import linkText from "@/utils/linkText";
import { computed, toRefs } from "vue";
import OutputType = TpTerminal.OutputType;

interface OutputProps {
  output: OutputType;
}

const props = defineProps<OutputProps>();
const { output } = toRefs(props);

const outputTagColor = computed((): string => {
  if (!output.value.status) return "";
  switch (output.value.status) {
    case "info":
      return "dodgerblue";
    case "success":
      return "limegreen";
    case "warning":
      return "darkorange";
    case "error":
      return "#c0300f";
    case "system":
      return "#bfc4c9";
    default:
      return "";
  }
});
</script>

<style lang="scss">
.ant-tag {
  span {
    font-weight: 800;
    font-family: "Courier New", Courier, monospace;
  }
}

.content-output {
  margin-bottom: 20px;
}
</style>
