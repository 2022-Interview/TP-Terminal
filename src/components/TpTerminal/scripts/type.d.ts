declare namespace TpTerminal {
  /**
   * 输入的命令类型
   */
  interface CommandInputType {
    text: string;
    placeholder: string;
  }

  /**
   * 输出的命令类型(折叠)
   */
  interface CommandOutputType extends OutputType {
    type: "command"; // 输出的类型
    text: string; // 输出内容对应的命令符
    resultList: OutputType[];
  }

  interface OutputType {
    type: "command" | "text" | "component";
    text: string;
    resultList: OutputType[];
  }
}
