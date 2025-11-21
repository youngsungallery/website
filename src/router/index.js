// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'

// HomeView.vue는 views 폴더에 있다고 명시적으로 임포트!
import HomeView from '@/views/HomeView.vue'; 

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
];

const router = createRouter({
  // ⭐️ createWebHashHistory에 아무런 인자도 넘겨주지 않거나, 
  // 넘겨준다면 './'로 명시적으로 현재 경로를 기준으로 라우팅하도록 합니다.
  history: createWebHashHistory(), // 👈 이렇게 변경
  // 또는 history: createWebHashHistory('./'), // 이렇게도 시도해 볼 수 있습니다.
  routes
});

export default router