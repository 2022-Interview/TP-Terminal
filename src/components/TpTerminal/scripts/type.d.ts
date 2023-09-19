declare namespace TpTerminal {
  /**
   * 输出状态
   */
  type OutputStatusType = "info" | "success" | "warning" | "error";

  /**
   * 文本类型输出
   */

  interface TextOutputType extends OutputType {
    type: "text";
    text: string;
  }

  /**
   * 输入的命令类型
   */
  interface CommandInputType {
    text: string;
    placeholder: string;
  }

  /**
   * 输出类型
   */
  interface OutputType {
    type: "command" | "text" | "component";
    text?: string;
    resultList?: OutputType[];
    component?: any;
    collapsible?: boolean;
    status?: string;
    props?: any;
  }

  /**
   * 输出的命令类型(折叠)
   */
  interface CommandOutputType extends OutputType {
    type: "command"; // 输出的类型
    text: string; // 输出内容对应的命令符
    resultList: OutputType[];
  }

  /**
   * 终端类型，定义一组访问及操作终端的方法
   */
  interface TerminalType {
    // 写命令文本结果
    writeTextResult: (text: string, status?: OutputStatusType) => void;
    setTerminalCollapsible: (collapsible: boolean) => void;
    writeTextErrorResult: (text: string) => void;
    writeTextOutput: (text: string, status?: OutputStatusType) => void;
  }
}
