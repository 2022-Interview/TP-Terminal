import { defineStore } from "pinia";

export const useTerminalConfigStore = defineStore("terminalConfig", {
  state: () => ({
    // 背景
    background: "black",
    // 输入提示
    showHint: true,
    // 终端欢迎语
    welcomeTexts: [] as string[]
  }),
  getters: {},
  actions: {
    setWelcomeTexts(welcomeTexts: string[]) {
      this.welcomeTexts = welcomeTexts;
    }
  },
  persist: {
    key: "terminal-config-store",
    storage: window.localStorage,
    beforeRestore: () => {
      console.log("load terminalConfigStore data start");
    },
    afterRestore: () => {
      console.log("load terminalConfigStore data end");
    }
  }
});
