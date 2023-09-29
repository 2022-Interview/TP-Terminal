/**
 * 快捷键系统
 * @author TP
 */
import TerminalType = TpTerminal.TerminalType;

export const registerShortcuts = (terminal: TerminalType) => {
  document.onkeydown = (e) => {
    const key = e.key;

    // 自动聚焦输入框
    if (key >= "a" && key <= "z" && !e.metaKey && !e.shiftKey && !e.ctrlKey) {
      terminal.focusInput();
      return;
    }
    const code = e.code;
    for (const keyCode of shortcutList) {
      if (code === keyCode.code) {
        keyCode.action(e, terminal);
      }
    }
  };
};

/**
 * 快捷键类型
 */
interface ShortcutType {
  code: string; // 按键码
  desc?: string; // 功能描述
  keyDesc?: string; // 按键描述
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  action: (e: Event, terminal: TerminalType) => void;
}

export const shortcutList: ShortcutType[] = [
  {
    desc: "查看上一条命令",
    code: "ArrowUp",
    keyDesc: "↑",
    action(e, terminal) {
      e.preventDefault();
      terminal.showPrevCommand();
    }
  },
  {
    desc: "查看下一条命令",
    code: "ArrowDown",
    keyDesc: "↓",
    action(e, terminal) {
      e.preventDefault();
      terminal.showNextCommand();
    }
  }
];
