// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'; // createWebHistory는 더 이상 사용하지 않음
import { createWebHashHistory } from 'vue-router'; // 👈 이 부분을 추가 (Hash Mode를 위한 import)

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
  // ⭐️⭐️⭐️ 여기가 가장 중요! createWebHistory 대신 createWebHashHistory 사용 ⭐️⭐️⭐️
  history: createWebHashHistory(), // 👈 이 한 줄로 변경
  routes
});

export default router;