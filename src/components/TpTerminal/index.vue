<template>
  <div class="tp-terminal-wrapper" :style="wrapperStyle">
    <div class="tp-terminal">
      <a-collapse
        v-model:activeKey="activeKeys"
        :bordered="false"
        expand-icon-position="end"
      >
        <span style="color: aliceblue">{{ outputList }}</span>
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
import TerminalType = TpTerminal.TerminalType;
import OutputStatusType = TpTerminal.OutputStatusType;
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

// 全局记录当前命令，便于上下切换命令
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let currentNewCommand: CommandOutputType;

// 提交命令（回车）
const doSubmitCommand = async () => {
  const inputText: string = inputCommand.value.text;
  // 创建新命令对象
  const newCommand: CommandOutputType = {
    type: "command",
    text: inputText,
    resultList: []
  };

  currentNewCommand = newCommand;

  // 添加输出命令数组
  await props.onSubmitCommand?.(inputText);

  outputList.value.push(newCommand);
  // 默认展开
  activeKeys.value.push(outputList.value.length - 1);
  // 重置输入框  todo: 为什么需要解构才能正常重置？
  inputCommand.value = { ...initCommand };
};

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
 * 操作终端的接口对象
 */
const terminal: TerminalType = { writeTextResult, setTerminalCollapsible };

defineExpose({
  terminal
});
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>
