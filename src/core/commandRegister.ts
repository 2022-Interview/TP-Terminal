import { CommandType } from "./command";
import { dateCommand } from "./commands/dateCommand";

const commandList: CommandType[] = [dateCommand];

/**
 * 命令字典
 */
const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.func] = command;
});

export { commandList, commandMap };
