import getopts from "getopts";
import { commandMap } from "./commandRegister";
import TerminalType = TpTerminal.TerminalType;
import { CommandOptionType, CommandType } from "./command";

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

  if (!command) {
    terminal.writeTextErrorResult("找不到命令");
    return;
  }
  // 解析参数（需传递不同的解析规则）
  const options = getParse(text, command.options);

  doAction(command, options, terminal);
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

  if (parentCommand && parentCommand.subCommands) {
    commands = parentCommand.subCommands;
  }

  const command = commands[func];
  return command;
};

/**
 * 获取参数
 * @param text
 * @param commandOptions
 * @returns
 */
const getParse = (
  text: string,
  commandOptions: CommandOptionType[]
): getopts.ParsedOptions => {
  // 过滤关键字（即命令）
  const args: string[] = text.split(" ").slice(1);

  // 转换
  const options: getopts.Options = {
    alias: {},
    default: {},
    string: [],
    boolean: []
  };
  const parsedOptions = getopts(args, options);
  return parsedOptions;
};

const doAction = (
  command: CommandType,
  parsedOptions: CommandOptionType,
  terminal: TerminalType
) => {
  if (command.collapsible) {
    terminal.setTerminalCollapsible(true);
  }
  command.action(parsedOptions, terminal);
};
