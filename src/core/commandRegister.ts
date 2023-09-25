import { CommandType } from "./command";
import { dateCommand } from "./commands/dateCommand";
import { welcomeCommand } from "./commands/terminal/config/welcomeCommand";
import { baiduCommand } from "./commands/search/baiduCommand";
import { helpCommand } from "./commands/terminal/help/helpCommand";
const commandList: CommandType[] = [
  welcomeCommand,
  dateCommand,
  baiduCommand,
  helpCommand
];

/**
 * 命令字典
 * todo：用Map对象是否更好
 */
const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.func] = command;
});

export { commandList, commandMap };
