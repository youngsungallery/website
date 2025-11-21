// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/website/', // ⭐️ '/website/'로 정확히 설정되어 있는지 다시 확인! ⭐️

  // 빌드 관련 추가 설정 (이전의 rollupOptions는 잠시 빼고 더 기본적인 것으로)
  build: {
    outDir: 'dist', // 빌드 결과물이 나올 디렉토리 (기본값)
    // 자산(assets)을 관리하는 public 폴더의 경로를 지정
    // 기본적으로 'public' 폴더에 있는 정적 파일들은 빌드 시 루트 경로로 복사됩니다.
    // GitHub Pages의 서브 경로에서는 명시적으로 설정하는 것이 도움이 될 수 있습니다.
    // publicDir: 'public', // 일반적으로 필요 없지만, 명시적으로 둘 수도 있습니다.
  },
})