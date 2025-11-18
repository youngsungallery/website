// website/src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'; // ✨ 새로 만든 HomeView를 불러와! ✨
import AdminPage from '../admin/views/AdminPage.vue'; // ✨ 새로 만든 AdminPage를 불러와! ✨

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView, // ✨ '/' 경로에서는 HomeView를 보여줄 거야 ✨
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage, // ✨ '/admin' 경로에서는 AdminPage를 보여줄 거야 ✨
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;