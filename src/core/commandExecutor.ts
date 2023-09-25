import getopts, { ParsedOptions } from "getopts";
import { commandMap } from "./commandRegister";
import TerminalType = TpTerminal.TerminalType;
import { CommandOptionType, CommandType } from "./command";
import { helpCommand } from "./commands/terminal/help/helpCommand";

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

  doAction(command, options, terminal, parentCommand);
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
  /**
   * 过滤关键字（即命令）
   * 例如：baidu 你好 -p   =>   ["你好"，"-p"]
   */
  const args: string[] = text.split(" ").slice(1);

  // 转换
  const options: getopts.Options = {
    alias: {},
    default: {},
    string: [],
    boolean: []
  };
  commandOptions.forEach((optionItem) => {
    const { alias, key, type, defaultValue } = optionItem;

    if (alias && options.alias) {
      options.alias[key] = alias;
    }
    options[type]?.push(key);
    if (defaultValue && options.default) {
      options.default[key] = defaultValue;
    }
  });
  console.log(args);
  console.log(options);
  /** 实现 参数缩写
   * https://www.npmjs.com/package/getopts
   * args： ["你好", "-p"]
   * options: {
   *    alias:{
   *      picture: ["p"],
   *      self: ["s"]
   *    },
   *    boolean: ["self", "picture"]
   * }
   *
   * getopts(): { p:true, picture: true, s: false, self: false,_:["你好"] }
   */
  const parsedOptions = getopts(args, options); // 返回参数状态

  return parsedOptions;
};

const doAction = (
  command: CommandType,
  options: ParsedOptions,
  terminal: TerminalType,
  parentCommand?: CommandType
) => {
  const { help } = options;

  if (command.collapsible) {
    terminal.setTerminalCollapsible(true);
  }

  if (help) {
    const newOptions = { ...options, _: [command.func] };
    helpCommand.action(newOptions, terminal, parentCommand);
  }

  command.action(options, terminal);
};
