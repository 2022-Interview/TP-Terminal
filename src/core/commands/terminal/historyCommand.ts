import { CommandType } from "@/core/command";

const historyCommmand: CommandType = {
  func: "history",
  name: "历史命令",
  alias: ["his"],
  options: [],
  action(options, terminal) {
    const commandOutputTypes = terminal.listCommandHistory();

    commandOutputTypes.forEach((command, index) => {
      terminal.writeTextResult(`${index + 1}、 ${command.text}`);
    });
  }
};

export default historyCommmand;
