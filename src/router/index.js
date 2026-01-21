// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import ExhibitionsPage from "@/pages/ExhibitionsPage.vue";
import WorksPage from "@/pages/WorksPage.vue";
// Admin은 추후 연결

const routes = [
  { path: "/", component: HomePage },
  { path: "/exhibitions", component: ExhibitionsPage },
  { path: "/works", component: WorksPage },
  { path: "/admin", component: () => import("@/pages/AdminPage.vue") }, // 추후
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
