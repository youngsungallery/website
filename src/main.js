// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' // ⭐ 1. Pinia 임포트 ⭐

const app = createApp(App)
const pinia = createPinia() // ⭐ 2. Pinia 인스턴스 생성 ⭐

app.use(pinia) // ⭐ 3. Vue 앱에 Pinia 사용 설정 (반드시 라우터보다 먼저! 다른 컴포넌트 사용 전에!) ⭐
app.use(router) // 4. 라우터 설정

app.mount('#app') // 5. 앱 마운트