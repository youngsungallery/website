import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite' // loadEnv 임포트
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => { // mode 매개변수
  // 환경 변수를 직접 로드! (기존 설정 유지)
  const env = loadEnv(mode, process.cwd(), ''); // .env 파일의 모든 변수를 로드

  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    envDir: './', // Vite가 .env 파일을 프로젝트 루트(./)에서 찾도록 명시

    // import.meta.env.VITE_GOOGLE_CLIENT_ID 값을 직접 정의! (기존 설정 유지)
    define: {
      'import.meta.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(env.VITE_GOOGLE_CLIENT_ID),
    },

    // ✨ HMR 폴링 설정 추가 (여기부터 새로 추가된 부분) ✨
    server: {
      host: true,      // Windows 브라우저와 WSL2 개발 서버 간 통신 개선
      watch: {
        usePolling: true // ✨ HMR을 위한 파일 변경 감지에 폴링 방식 사용 ✨
      }
    }
  };
});