import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "advance",
    component: () => import("@/pages/Advance/index.vue")
  },
  {
    path: "/normal",
    name: "Normal",
    component: () => import("@/pages/Normal/index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
