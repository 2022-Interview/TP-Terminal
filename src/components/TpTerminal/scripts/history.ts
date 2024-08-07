import { Ref, ref } from "vue";

import CommandOutputType = TpTerminal.CommandOutputType;
import CommandInputType = TpTerminal.CommandInputType;

const useHistory = (
  commandList: CommandOutputType[],
  inputCommand: Ref<CommandInputType>
) => {
  const commandHistoryPos = ref(commandList.length);

  const listCommandHistory = () => {
    return commandList;
  };

  const showPrevCommand = () => {
    if (commandHistoryPos.value >= 1) {
      commandHistoryPos.value--;
      inputCommand.value.text = commandList[commandHistoryPos.value].text;
    }
  };

  const showNextCommand = () => {
    if (commandHistoryPos.value < commandList.length - 1) {
      commandHistoryPos.value++;
      inputCommand.value.text = commandList[commandHistoryPos.value].text;
    } else {
      inputCommand.value.text = "";
    }
  };

  return {
    showPrevCommand,
    showNextCommand,
    commandHistoryPos,
    listCommandHistory
  };
};
export default useHistory;
