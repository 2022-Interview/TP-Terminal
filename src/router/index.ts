import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

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
  history: createWebHistory(),
  routes
});

export default router;
