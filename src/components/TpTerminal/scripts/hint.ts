import { useTerminalConfigStore } from "@/core/commands/terminal/welcome/store/terminalConfigStore";
import { ref } from "vue";
import _, { trim } from "lodash";
import { commandMap } from "@/core/commandRegister";
import { getUsageStr } from "@/core/commands/terminal/help/helpUtils";
/**
 * 命令提示功能
 */

const useHint = () => {
  const hint = ref("");
  const { showHint } = useTerminalConfigStore();

  const setHint = (inputText: string) => {
    // 提示关闭
    if (!showHint) return;
    if (!inputText) {
      hint.value = "";
      return;
    }
    const args = trim(inputText).split(" ");
    // 大小写无关
    const func = args[0].toLowerCase();

    // 命令前缀匹配
    const likeKey = Object.keys(commandMap).filter((key) =>
      key.startsWith(func)
    )[0];
    // 获取命令
    const command = commandMap[likeKey];
    if (!command) {
      hint.value = "";
      return;
    }

    // 子命令提示
    if (
      command.subCommands &&
      Object.keys(command.subCommands).length > 0 &&
      args.length > 1
    ) {
      hint.value = getUsageStr(command.subCommands[args[1]], command);
    } else {
      hint.value = getUsageStr(command);
    }
  };

  const debounceSetHint = _.debounce(function (inputText: string) {
    setHint(inputText);
  }, 500);

  return {
    hint,
    setHint,
    debounceSetHint
  };
};

export default useHint;
