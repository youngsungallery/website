// FILE: vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig(() => {
  // ✅ GitHub Pages + 커스텀 도메인(youngsungallery.com) 기준:
  // - 사이트는 도메인 루트(/)에서 서비스됨
  // - base를 /website/로 두면 404.html 리다이렉트가 ?p=를 계속 중첩시켜 414(URI Too Long) 루프가 발생할 수 있음
  const base = "/";

  return {
    plugins: [vue()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    base,

    // 로컬 HMR 안정화(WSL + /mnt/*)
    server: {
      host: "0.0.0.0",
      port: 5173,
      strictPort: true,
      hmr: {
        protocol: "ws",
        host: "localhost",
      },
      watch: {
        usePolling: true,
        interval: 100,
        ignored: ["**/node_modules/**"],
      },
    },
  };
});
