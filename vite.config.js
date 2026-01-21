// src/vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command }) => {
  // 배포용 base 경로 설정
  const base = command === 'build' && process.env.DEPLOY_ENV === 'GH_PAGES' ? '/website/' : '/'

  return {
    plugins: [vue()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    base,

    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      hmr: { protocol: 'ws', host: 'localhost' },
      watch: { usePolling: true, interval: 100, ignored: ['**/node_modules/**'] },
    },
  }
})
