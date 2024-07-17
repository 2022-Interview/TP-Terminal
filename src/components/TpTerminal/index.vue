<template>
  <div
    class="tp-terminal-wrapper"
    :style="wrapperStyle"
    @click="handleClickWrapper"
  >
    <div class="tp-terminal">
      <a-collapse
        v-model:activeKey="activeKeys"
        :bordered="false"
        expand-icon-position="end"
      >
        <!-- 折叠 -->
        <template v-for="(output, index) in outputList" :key="index">
          <a-collapse-panel
            v-if="output.collapsible"
            :key="index"
            class="terminal-row"
          >
            <template #header>
              <span style="user-select: none"> [local]$ </span>
              <span>{{ output.text }}</span>
            </template>
            <div v-for="(res, idx) in output.resultList" :key="idx">
              <content-output :output="res" />
            </div>
          </a-collapse-panel>
          <!-- 不折叠 -->
          <template v-else>
            <!-- 输出命令和结果 -->
            <template v-if="output.type === 'command'">
              <div class="terminal-row">
                <span style="user-select: none"> [local]$ </span>
                <span>{{ output.text }}</span>
              </div>
              <div
                v-for="(res, idx) in output.resultList"
                :key="idx"
                class="terminal-row"
              >
                <content-output :output="res" />
              </div>
            </template>

            <!-- 纯打印文字：例如欢迎语 -->
            <template v-else>
              <div class="terminal-row">
                <content-output :output="output" />
              </div>
            </template>
          </template>
        </template>
      </a-collapse>

      <div class="terminal-row">
        <a-input
          ref="commandInputRef"
          v-model:value="inputCommand.text"
          class="command-input"
          :bordered="false"
          :placeholder="inputCommand.placeholder"
          @press-enter="doSubmitCommand"
          onfocus
          autofocus
        >
          <template #addonBefore>
            <span class="command-input-prompt">🎊[local]$</span>
          </template>
        </a-input>
      </div>

      <!-- 输入提示 -->
      <div v-if="hint" class="terminal-row tip">hint：{{ hint }}</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="TpTerminal">
import { computed, ref, onMounted, watchEffect } from "vue";
import CommandInputType = TpTerminal.CommandInputType;
import CommandOutputType = TpTerminal.CommandOutputType;
import OutputType = TpTerminal.OutputType;
import TerminalType = TpTerminal.TerminalType;
import OutputStatusType = TpTerminal.OutputStatusType;
import TextOutputType = TpTerminal.TextOutputType;

import { useTerminalConfigStore } from "@/core/commands/terminal/welcome/store/terminalConfigStore";
import useHint from "./scripts/hint";
import useHistory from "./scripts/history";
import { registerShortcuts } from "./scripts/shortcuts";

interface TpTerminalProps {
  height?: string;
  background?: string;
  onSubmitCommand?: (inputText: string) => void;
}
const props = withDefaults(defineProps<TpTerminalProps>(), {
  height: "100%",
  background: "https://img.btstu.cn/api/images/5de7786cc7586.jpg"
});

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
// 输出命令列表
const outputList = ref<OutputType[]>([]);
// 命令列表 用于命令操作，例如，上下切换命令
const commandList = ref<CommandOutputType[]>([]);
const commandInputRef = ref();

// 引入终端配置状态
const configStore = useTerminalConfigStore();

// 全局记录当前命令，便于上下切换命令
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let currentNewCommand: CommandOutputType;

const { hint, debounceSetHint } = useHint();

const {
  showPrevCommand,
  showNextCommand,
  commandHistoryPos,
  listCommandHistory
} = useHistory(commandList.value, inputCommand);

// 提交命令（回车）
const doSubmitCommand = async () => {
  const inputText: string = inputCommand.value.text;
  // 创建新命令对象
  const newCommand: CommandOutputType = {
    type: "command",
    text: inputText,
    resultList: []
  };

  // todo 利用对象的内存特性，实现修改内部变量
  currentNewCommand = newCommand;

  // 添加输出命令数组
  await props.onSubmitCommand?.(inputText);
  outputList.value.push(newCommand);

  // 不为空字符串才是有效命令
  if (inputText) {
    commandList.value.push(newCommand);
    commandHistoryPos.value = commandList.value.length;
  }
  console.log(outputList.value);

  // 默认展开
  activeKeys.value.push(outputList.value.length - 1);
  // 重置输入框  todo: 为什么需要解构才能正常重置？
  inputCommand.value = { ...initCommand };
};

//
watchEffect(() => {
  debounceSetHint(inputCommand.value.text);
});

/**
 * 写入文本结果
 * @param text  文本
 * @param status  状态
 */
const writeTextResult = (text: string, status?: OutputStatusType) => {
  const newOutput: any = {
    text,
    type: "text",
    status
  };
  currentNewCommand.resultList.push(newOutput);
};

// 设置是否输出折叠
const setTerminalCollapsible = (collapsible: boolean) => {
  currentNewCommand.collapsible = collapsible;
};
/**
 * 错误文本提示
 * @param text 提示信息
 */
const writeTextErrorResult = (text: string) => {
  writeTextResult(text, "error");
};

const writeTextSuccessResult = (text: string) => {
  writeTextResult(text, "success");
};

const writeTextOutput = (text: string, status?: OutputStatusType) => {
  const newOutput: TextOutputType = {
    text,
    type: "text",
    status
  };

  outputList.value.push(newOutput);
};

const writeResult = (output: OutputType) => {
  currentNewCommand.resultList.push(output);
};

const focusInput = () => {
  commandInputRef.value.focus();
};

/**
 * 当点击空白聚焦输入框
 */
function handleClickWrapper(event: Event): void {
  if (event.target.className === "tp-terminal") {
    focusInput();
  }
}

/**
 * 清空所有输出
 */
const clear = () => {
  outputList.value = outputList.value.filter((item) => {
    return item.type !== "command";
  });
};

/**
 * 操作终端的接口对象
 */
const terminal: TerminalType = {
  writeTextResult,
  setTerminalCollapsible,
  writeTextErrorResult,
  writeTextSuccessResult,
  writeTextOutput,
  writeResult,
  focusInput,

  showPrevCommand,
  showNextCommand,
  listCommandHistory,
  clear
};

onMounted(() => {
  registerShortcuts(terminal);
  const { welcomeTexts } = configStore;
  if (welcomeTexts?.length > 0) {
    welcomeTexts.forEach((item) => {
      terminal.writeTextOutput(item);
    });
  } else {
    terminal.writeTextOutput(
      `Welcome to TP-Terminal, coolest browser index for geeks!` +
        `<a href="//github.com/2022-Interview/TP-Terminal" target='_blank'> GitHub Open Source</a>`
    );
    terminal.writeTextOutput(
      `Author <a href="" target="_blank">TP-Soleil</a>` +
        `: please input 'help' to enjoy`
    );
  }
});

defineExpose({
  terminal
});
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>
