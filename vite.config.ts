import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

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
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      input: {
        index: "index.html"
      },
      // 静态资源分类打包
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        // TODO: 处理GitHub Pages 部署 _plugin-vue_export-helper.js 404
        // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
        sanitizeFileName(name: any) {
          const match = DRIVE_LETTER_REGEX.exec(name);
          const driveLetter = match ? match[0] : "";
          // A `:` is only allowed as part of a windows drive letter (ex: C:\foo)
          // Otherwise, avoid them because they can refer to NTFS alternate data streams.
          return (
            driveLetter +
            name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
          );
        },
        manualChunks(id: any) {
          if (id.includes("node_modules")) {
            return (
              id
                .toString()
                .match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)
                ?.groups!.moduleName ?? "vender"
            );
          }
        }
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
        //   }
        // }
      }
    }
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://8.217.69.156/api/",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, "")
  //     }
  //   }
  // }
});
