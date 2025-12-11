// src/router/index.js

// ⭐⭐⭐ createWebHistory 대신 createWebHashHistory를 임포트합니다! ⭐⭐⭐
import { createRouter, createWebHashHistory } from 'vue-router'; 
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
  // ⭐⭐⭐ history: createWebHashHistory('/website/') 로 변경해주세요! ⭐⭐⭐
  // GitHub Pages 배포 시 404 문제를 해결하기 위해 HashHistory 모드를 사용합니다.
  history: createWebHashHistory('/website/'), 
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