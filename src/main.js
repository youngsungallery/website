// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Vue Router 인스턴스 가져오기

const app = createApp(App);

// Vue Router를 애플리케이션에 연결할 때,
// import.meta.env.BASE_URL을 사용해 현재 배포된 기본 URL을 넘겨줍니다.
// 이는 Vite의 base 옵션과 연동됩니다.
app.use(router);

// 최종적으로 '#app' ID를 가진 DOM 엘리먼트에 Vue 앱을 마운트합니다.
app.mount('#app');
