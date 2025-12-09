import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/website/', // GitHub Pages 프로젝트 페이지 경로 설정
  plugins: [vue()],
})