import { CommandType } from "@/core/command";

const clearCommand: CommandType = {
  func: "clear",
  name: "清屏",
  alias: [],
  options: [],
  action(_, terminal) {
    setTimeout(() => {
      terminal.clear();
    });
  }
};

export default clearCommand;
