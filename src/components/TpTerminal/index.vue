<template>
  <div class="tp-terminal-wrapper" :style="wrapperStyle">
    <div class="tp-terminal">
      <a-collapse
        v-model:activeKey="activeKeys"
        :bordered="false"
        expand-icon-position="end"
      >
        <!-- 折叠 -->
        <template v-for="(output, index) in outputList" :key="index">
          <a-collapse-panel v-if="output" :key="index" class="terminal-row">
            <template #header>
              <span style="user-select: none"> [local]$ </span>
              <span>{{ 11111 }}</span>
            </template>
            <div key="1">222</div>
          </a-collapse-panel>
          <!-- 不折叠 -->
          <template v-else>
            <!-- 输出命令和结果 -->
            <template></template>

            <!-- 纯打印文字：例如欢迎语 -->
            <template></template>
          </template>
        </template>
      </a-collapse>

      <div class="terminal-row">
        <a-input
          v-model:value="inputCommand.text"
          class="command-input"
          :bordered="false"
          :placeholder="inputCommand.placeholder"
          @press-enter="doSubmitCommand"
          onfocus
        >
          <template #addonBefore>
            <span class="command-input-prompt">[local]$</span>
          </template>
        </a-input>
      </div>

      <!-- 输入提示 -->
      <div class="terminal-row tip">hint：请输入 user</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="TpTerminal">
import { computed, ref, onMounted } from "vue";
import CommandInputType = TpTerminal.CommandInputType;
import CommandOutputType = TpTerminal.CommandOutputType;
import OutputType = TpTerminal.OutputType;

interface TpTerminalProps {
  height?: string;
  background?: string;
  onSubmitCommand?: (inputText: string) => void;
}
const props = withDefaults(defineProps<TpTerminalProps>(), {
  height: "100%",
  background: "https://img.btstu.cn/api/images/5de7786cc7586.jpg"
});

onMounted(() => {});

/**
 * 终端样式
 */
const wrapperStyle = computed(() => {
  const { background } = props;
  const bg = background.startsWith("http") ? `url(${background})` : background;
  return {
    height: props.height,
    background: bg
  };
});

// 初始化命令 （便于后续重置输入框）
const initCommand: CommandInputType = {
  text: "",
  placeholder: ""
};

// activeKeys 折叠激活
const activeKeys = ref<number[]>([0]);
// 输入命令
const inputCommand = ref<CommandInputType>({ ...initCommand });
// 命令列表
const outputList = ref<OutputType[]>([]);

// 提交命令（回车）
const doSubmitCommand = async () => {
  const inputText: string = inputCommand.value.text;

  // 创建新命令对象
  const newCommand: CommandOutputType = {
    type: "command",
    text: inputText,
    resultList: []
  };

  // 添加输出命令数组
  outputList.value.push(newCommand);
  await props.onSubmitCommand?.(inputText);

  // 默认展开
  activeKeys.value.push(outputList.value.length - 1);
  // 重置输入框  todo: 为什么需要解构才能正常重置？
  inputCommand.value = { ...initCommand };
};
</script>

<style lang="scss" scoped>
.tp-terminal-wrapper {
  background: black;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .tp-terminal {
    background: rgba(0, 0, 0, 0.6);
    padding: 20px;
    overflow: scroll;
    height: 100%;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      display: none;
    }

    :deep(.ant-collapse > .ant-collapse-item > .ant-collapse-header) {
      color: white;
      padding: 0 0 12px;
    }
    // 折叠框内容
    :deep(.ant-collapse-content) {
      color: #fff;
      font-size: 16px;
    }
    :deep(.ant-collapse-borderless > .ant-collapse-item) {
      border: none;
    }
  }

  .terminal-row {
    color: #fff;

    span {
      font-size: 16px;
      font-weight: bolder;
      font-family: courier-new, courier, monospace;
    }

    .command-input {
      caret-color: white;

      :deep(input) {
        color: white !important;
        font-size: 16px;
        padding: 0 10px;
      }
      :deep(.ant-input-group-addon) {
        border: none;
        padding: 0;
      }
    }

    .command-input-prompt {
      color: white;
      background: transparent;
      user-select: none;
    }
  }

  .tip {
    color: rgba(255, 255, 255, 0.4);
  }
}
</style>
