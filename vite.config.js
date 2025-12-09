import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // path 모듈 임포트

// https://vitejs.dev/config/
export default defineConfig({
  base: '/website/', // GitHub Pages 프로젝트 페이지 경로 설정
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // @ 별칭을 src 폴더로 설정
    },
  },
});