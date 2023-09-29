import { CommandType } from "@/core/command";
import { useUserStore } from "./userStore";
import { USER_INFO } from "./userConstant";
import registerCommand from "./subCommands/registerCommand";
import loginCommand from "./subCommands/loginCommand";

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
  subCommands: { register: registerCommand, login: loginCommand },
  action(options, terminal) {
    const { userInfo } = useUserStore();
    if (userInfo && userInfo.username !== USER_INFO.username) {
      let text = `当前用户：${userInfo.username}`;
      if (userInfo.email) {
        text += ` ${userInfo.email}`;
      }
      terminal.writeTextResult(text);
    } else {
      terminal.writeTextErrorResult("未登录，请使用命令 user login 进行登录");
    }
  }
};
export default [userCommands];
