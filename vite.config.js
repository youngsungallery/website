// vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // GitHub Pages 배포를 위한 base 경로를 조건부로 설정
  base: process.env.NODE_ENV === 'production' ? '/website/' : '/',
  
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
    // ⭐⭐⭐ World Time API 프록시 설정을 추가합니다! ⭐⭐⭐
  },
  // (선택 사항: 빌드 아웃풋 경로)
  // build: {
  //   outDir: 'dist',
  // },
})