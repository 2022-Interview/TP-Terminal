import { CommandType } from "./command";
import { dateCommand } from "./commands/dateCommand";
import { welcomeCommand } from "./commands/terminal/config/welcomeCommand";
const commandList: CommandType[] = [welcomeCommand, dateCommand];

/**
 * 命令字典
 * todo：用Map对象是否更好
 */
const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.func] = command;
});

export { commandList, commandMap };
