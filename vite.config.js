// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  
  // GitHub Pages 배포 시 기본 경로 설정
  // 'youngsungallery/website' 저장소에 대한 프로젝트 페이지이므로,
  // 저장소 이름과 동일하게 '/website/'로 설정합니다.
  base: '/website/', 
})