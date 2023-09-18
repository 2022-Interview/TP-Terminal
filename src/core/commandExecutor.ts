import { commandMap } from "./commandRegister";
import TerminalType = TpTerminal.TerminalType;
import { CommandType } from "./command";

/**
 * 匹配命令并执行
 * @param text  输入的命令字符
 * @param terminal  终端
 * @param parentCommand  父命令
 */

export const doCommandExecute = (
  text: string,
  terminal: TerminalType,
  parentCommand?: CommandType
) => {
  text = text.trim();
  if (!text) return;
  const command: CommandType = getCommmand(text, parentCommand);
  if (command.collapsible) {
    terminal.setTerminalCollapsible(true);
  }
  command.action(null, terminal);
};

/**
 * 解析命令
 * @param text 命令字符
 * @param parentCommand 有二级命令的父级命令
 */
const getCommmand = (
  text: string,
  parentCommand?: CommandType
): CommandType => {
  const func = text.split(" ", 1)[0];
  func.toLowerCase();

  let commands = commandMap;

  if (parentCommand) {
    commands = parentCommand.subCommands;
  }

  const command = commands[func];
  return command;
};
