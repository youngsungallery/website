// vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // ⭐⭐⭐ 1. GitHub Pages 배포를 위한 base 경로를 조건부로 설정 ⭐⭐⭐
  // 로컬 개발 시에는 '/' (루트), GitHub Pages 배포 시에만 '/website/' 사용
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
  },
  // ⭐ (선택 사항: 만약 빌드 아웃풋 경로를 다르게 설정하고 싶다면) ⭐
  // build: {
  //   outDir: 'dist', // 빌드 아웃풋 폴더 이름 (기본값: 'dist')
  // },
})