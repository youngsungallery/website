// FILE: vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig(({ command }) => {
  // 로컬(dev): /
  // 커스텀 도메인(build): /
  // GH Pages 프로젝트 경로(build + ENV): /website/
  const isGhPagesBuild = command === "build" && process.env.DEPLOY_ENV === "GH_PAGES";
  const base = isGhPagesBuild ? "/website/" : "/";

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
