import { CommandType } from "./command";
import { dateCommand } from "./commands/date/dateCommand";
import { welcomeCommand } from "./commands/terminal/welcome/welcomeCommand";
import { baiduCommand } from "./commands/search/baiduCommand";
import { helpCommand } from "./commands/terminal/help/helpCommand";
import userCommands from "./commands/user/userCommands";
import fanyiCommand from "./commands/fanyi/fanYiCommand";
import clearCommand from "./commands/terminal/clearCommand";
import historyCommmand from "./commands/terminal/historyCommand";
import musicCommand from "./commands/music/musicCommand";

const commandList: CommandType[] = [
  helpCommand,
  welcomeCommand,
  dateCommand,
  baiduCommand,
  ...userCommands,
  fanyiCommand,
  clearCommand,
  historyCommmand,
  musicCommand
];

/**
 * 命令字典
 * todo：用Map对象是否更好
 */
const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.func] = command;

  // 命令缩写注册
  command.alias?.forEach((name) => {
    commandMap[name] = command;
  });
});

export { commandList, commandMap };
