import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/views/HomeView.vue') // 경로 변경!
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/components/views/AdminView.vue') // 경로 변경!
  }
];

const router = createRouter({
  history: createWebHistory('/website/'), // GitHub Pages의 base 경로와 일치
  routes
});

export default router;