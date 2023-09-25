import { CommandType } from "@/core/command";
import ComponentOutputType = TpTerminal.ComponentOutputType;
import { defineAsyncComponent } from "vue";
import { commandMap } from "@/core/commandRegister";

export const helpCommand: CommandType = {
  func: "help",
  name: "查看帮助",
  alias: [],
  params: [
    {
      key: "commandName",
      desc: "命令英文名称"
    }
  ],
  options: [],
  collapsible: true,
  action(options, terminal, parentCommand) {
    const { _ } = options;
    if (_.length < 1) {
      const output: ComponentOutputType = {
        type: "component",
        component: defineAsyncComponent(() => import("./HelpBox.vue"))
      };
      terminal.writeResult(output);
      return;
    }
    console.log(_);

    // 输出某个命令的帮助
    const commandName = _[0];
    let commands = commandMap;
    // 支持输出子命令的帮助
    if (
      parentCommand &&
      parentCommand.subCommands &&
      Object.keys(parentCommand.subCommands).length > 0
    ) {
      commands = parentCommand.subCommands;
    }

    const command = commands[commandName];
    if (!command) {
      terminal.writeTextErrorResult("找不到命令");
      return;
    }

    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./CommandHelpBox.vue")),
      props: {
        command,
        parentCommand
      }
    };
    terminal.writeResult(output);
  }
};
