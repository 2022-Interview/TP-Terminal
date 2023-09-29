import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          // todo：引入样式会报找不到
          importStyle: false
        })
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});
