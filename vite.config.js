// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // ⭐⭐⭐ 여기를 확인하고 수정합니다! ⭐⭐⭐
  base: '/', // 이 부분을 'base: "/website/"' 가 아닌 '/' 또는 '' (빈 문자열)로 변경하세요.
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src', // @ 별칭 설정 (기존에 있을 겁니다)
    },
  },
  server: {
    host: '0.0.0.0', // WSL2에서 접근 가능하도록 설정 (기존에 있을 겁니다)
    port: 5173,      // 포트 설정
    watch: {
      usePolling: true, // HMR 문제 해결을 위한 폴링 (기존에 있을 겁니다)
    },
  },
})