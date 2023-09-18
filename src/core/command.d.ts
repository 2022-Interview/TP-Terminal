import TerminalType = TpTerminal.TerminalType;

export interface CommandType {
  func: string;
  name: string;
  options: any;
  action: (options: any, terminal: TerminalType) => void;
  collapsible?: boolean;
  // 子命令 todo： 为什么这样定义
  subCommands?: Record<string, CommandType>;
}
