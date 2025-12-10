import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // path 모듈 임포트

// https://vitejs.dev/config/
export default defineConfig({
  base: '/website/', // GitHub Pages 프로젝트 페이지 경로 설정
  server: { // <<-- 이 부분이 추가됩니다!
    watch: {
      usePolling: true, // 파일 변경을 감지하기 위해 폴링 방식 사용 (WSL에서 특히 유용)
    },
    hmr: {
      overlay: false // 빌드 오류 시 브라우저 오버레이 비활성화 (선택 사항)
      // clientPort: 5173 // 필요시 HMR 클라이언트 포트를 명시적으로 지정
      // protocol: 'ws', // 필요시 HMR 프로토콜 지정
    }
  }, // <<-- 여기까지 추가됩니다!
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // @ 별칭을 src 폴더로 설정
    },
  },
});