import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router'; // 라우터 임포트

createApp(App).use(router).mount('#app'); // 라우터 사용 등록