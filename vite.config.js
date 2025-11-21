// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// ✨ 이 path 모듈을 import 해야 합니다! ✨
import path from 'path' 

export default defineConfig({
  plugins: [vue()],
  base: '/website/', 

  // ✨ 이 부분을 추가해 줘! ✨
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // '@/를 프로젝트의 'src' 폴더로 연결합니다.
    },
  },
})