import { CommandType } from "@/core/command";
import registerCommand from "./subCommands/registerCommand";

const userCommands: CommandType = {
  func: "user",
  name: "用户",
  alias: [], // 别名
  params: [
    {
      key: "subCommand",
      desc: "子命令",
      required: true
    }
  ],
  options: [],
  subCommands: { register: registerCommand },
  action(options, terminal) {
    terminal.writeTextSuccessResult("当前用户");
  }
};
export default [userCommands];
