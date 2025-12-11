// vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 1. GitHub Pages 배포를 위한 base 경로 설정
  //    '/' 대신 프로젝트 레포지토리 이름을 base로 사용해야 합니다.
  //    예: 'youngsungallery/website' 레포지토리라면 '/website/' 로 설정합니다.
  base: '/website/', // ⭐⭐⭐ 이 부분을 이렇게 수정해주세요! ⭐⭐⭐
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