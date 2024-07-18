import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Visual",
    component: () => import("@/pages/Visual/index.vue")
  },
  {
    path: "/command",
    name: "command",
    component: () => import("@/pages/Command/index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
