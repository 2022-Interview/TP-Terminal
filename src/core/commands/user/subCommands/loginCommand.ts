import { CommandType } from "@/core/command";
import { userLoginApi } from "../userApi";
import { useUserStore } from "../userStore";

const loginCommand: CommandType = {
  func: "login",
  name: "用户登录",
  options: [
    {
      key: "username",
      alias: ["u"],
      type: "string",
      required: true
    },
    {
      key: "password",
      alias: ["p"],
      type: "string",
      required: true
    }
  ],
  async action(options, terminal) {
    const { username, password } = options;
    if (!username) {
      terminal.writeTextErrorResult("请输入用户名");
      return;
    }
    if (!password) {
      terminal.writeTextErrorResult("请输入密码");
      return;
    }

    const res: any = await userLoginApi(username, password);
    const { setUserInfo } = useUserStore();
    if (res.code === 200) {
      setUserInfo(res.data);
      terminal.writeTextResult("登录成功");
    } else {
      terminal.writeTextErrorResult(res.message ?? "登录失败");
    }
  }
};

export default loginCommand;
