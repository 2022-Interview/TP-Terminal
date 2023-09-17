import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { globalConfig } from "./config";
const app = createApp(App);

// 状态管理
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
// 路由
app.use(router);
router.push(
  `/${globalConfig.defaultView === "advance" ? "" : globalConfig.defaultView}`
);

app.mount("#app");
