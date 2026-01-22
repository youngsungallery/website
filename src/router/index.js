// FILE: src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, ADMIN_EMAIL } from "@/lib/firebase";

import HomePage from "@/pages/HomePage.vue";
import AdminPage from "@/pages/AdminPage.vue";
import AdminLoginPage from "@/pages/admin/AdminLoginPage.vue";

import AdminExhibitionsPage from "@/pages/admin/AdminExhibitionsPage.vue";
import AdminWorksPage from "@/pages/admin/AdminWorksPage.vue";
import AdminInquiriesPage from "@/pages/admin/AdminInquiriesPage.vue";

const routes = [
  { path: "/", component: HomePage },

  { path: "/admin/login", component: AdminLoginPage },

  // 관리자 메인(카드 메뉴)
  { path: "/admin", component: AdminPage, meta: { requiresAdmin: true } },

  // 관리자 하위 메뉴 페이지들
  {
    path: "/admin/exhibitions",
    component: AdminExhibitionsPage,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/works",
    component: AdminWorksPage,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/inquiries",
    component: AdminInquiriesPage,
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  // ✅ GH Pages 레포 배포 베이스 경로 고정 (https://youngsungallery.github.io/website/)
  history: createWebHistory("/website/"),
  routes,
});

let authReady = null;

function waitAuthReady() {
  if (authReady) return authReady;

  authReady = new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, () => {
      unsub();
      resolve();
    });
  });

  return authReady;
}

router.beforeEach(async (to) => {
  if (!to.meta.requiresAdmin) return true;

  await waitAuthReady();

  const user = auth.currentUser;
  const ok =
    !!user &&
    user.email &&
    user.email.toLowerCase() === String(ADMIN_EMAIL || "").toLowerCase();

  if (!ok) {
    return { path: "/admin/login", query: { redirect: to.fullPath } };
  }
  return true;
});

export default router;
