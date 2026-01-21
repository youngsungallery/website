import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, ADMIN_EMAIL } from "@/lib/firebase";

import HomePage from "@/pages/HomePage.vue";
import AdminPage from "@/pages/AdminPage.vue";
import AdminLoginPage from "@/pages/admin/AdminLoginPage.vue";

const routes = [
  { path: "/", component: HomePage },

  { path: "/admin/login", component: AdminLoginPage },
  { path: "/admin", component: AdminPage, meta: { requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
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
