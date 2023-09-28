import TerminalType = TpTerminal.TerminalType;

// 命令类型
export interface CommandType {
  func: string; // 命令英文 key(必须唯一)
  name: string; // 命令名称
  options: CommandOptionType[]; // 选项配置 -w -t
  params?: CommandParamsType[]; // 参数配置 传递的内容
  // 命令执行函数
  action: (
    options: any,
    terminal: TerminalType,
    parentCommand?: CommandType
  ) => void;
  desc?: string;
  // 是否输出折叠
  collapsible?: boolean; // 是否折叠
  alias?: string[]; // 功能别名，即 简写
  status?: string; // 当前输出的显示状态：例如：error ： 红色
  // 子命令 todo： 为什么这样定义
  subCommands?: Record<string, CommandType>;
}

// 命令选项类型
export interface CommandOptionType {
  key: string; // 参数名，比如 --word
  alias?: string[]; // 命令简写，比如 -w
  desc?: string; // 描述
  type: "string" | "boolean";
  defaultValue?: string | boolean; // 默认值，标识作用
  required?: boolean; // 是否必填
}

export interface CommandParamsType {
  key: string; // 参数名
  desc: string; // 描述
  required?: boolean; // 是否必填
  defaultValue?: string | boolean; // 默认值
}
