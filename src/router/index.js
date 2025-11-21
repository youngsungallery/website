// src/router/index.js (수정된 부분)
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'; 

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // ⭐️⭐️⭐️ 이 부분을 다시 한번 확인하고 추가해 줘! ⭐️⭐️⭐️
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const el = document.querySelector(to.hash); // 해시 값으로 DOM 엘리먼트 찾기
      if (el) {
        return {
          el: el,
          behavior: 'smooth',
          // top: el.offsetTop, // 필요에 따라 offsetTop을 사용할 수도 있지만 el 자체가 더 일반적
        };
      }
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

export default router