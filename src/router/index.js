// src/router/index.js

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
    component: () => import('../admin/views/AdminLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '', // /admin 경로 자체에 매핑 (대시보드)
        name: 'admin-dashboard',
        component: () => import('../admin/views/AdminView.vue'),
      },
      // ⭐⭐⭐ 새로 추가되는 라우트들 ⭐⭐⭐
      {
        path: 'exhibitions', // /admin/exhibitions
        name: 'admin-exhibitions',
        component: () => import('../admin/views/ExhibitionsView.vue'),
      },
      {
        path: 'artworks', // /admin/artworks
        name: 'admin-artworks',
        component: () => import('../admin/views/ArtworksView.vue'),
      },
      {
        path: 'settings', // /admin/settings
        name: 'admin-settings',
        component: () => import('../admin/views/SettingsView.vue'),
      },
    ],
  },
];

const router = createRouter({
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