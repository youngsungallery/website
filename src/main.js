// FILE: src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

/**
 * ✅ GH Pages repo base(/website) 강제 보정
 * - 구글 로그인/외부 리다이렉트 후에 / 로 떨어지는 경우를 흡수
 * - /website/... 로 항상 정렬해줌
 */
(function normalizeGhPagesBase() {
  const REPO_BASE = "/website"; // 고정
  const { hostname, pathname, search, hash } = window.location;

  // youngsungallery.github.io 도메인에서만 강제 (원하면 endsWith("github.io")로 넓혀도 됨)
  const isGhPages = hostname === "youngsungallery.github.io";

  if (!isGhPages) return;

  // 이미 /website 로 시작하면 OK
  if (pathname === REPO_BASE || pathname.startsWith(REPO_BASE + "/")) return;

  // / 로 시작하는 모든 경로를 /website 접두로 이동
  const next = REPO_BASE + pathname + search + hash;
  window.location.replace(next);
})();

createApp(App).use(router).mount("#app");
