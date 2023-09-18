import { CommandType } from "../command";
import dayjs from "../../plugins/dayjs";

export const dateCommand: CommandType = {
  func: "date",
  name: "日期",
  options: [],
  collapsible: true,
  action(options, terminal): void {
    const dateStr = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const output = `当前时间：${dateStr}`;
    terminal.writeTextResult(output);
  }
};
