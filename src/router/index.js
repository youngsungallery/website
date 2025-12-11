// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { auth } from '@/plugins/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../admin/views/AdminView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  // ⭐⭐⭐ 이 부분을 이렇게 수정해주세요! ⭐⭐⭐
  history: createWebHistory('/website/'),
  // 만약 위 설정으로도 문제가 발생하거나 URL에 '#'이 포함되는 것이 괜찮다면,
  // history: createWebHashHistory(), 이 방안도 고려할 수 있습니다.
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = await getCurrentUser();
    if (!user) {
      console.log('Firebase: 관리 페이지 접근 시도, 로그인 필요');
      next();
    } else {
      console.log(`Firebase: 관리 페이지 접근 허용: ${user.email}`);
      next();
    }
  } else {
    next();
  }
});

export default router;