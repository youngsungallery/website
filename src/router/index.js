// src/router/index.js

import { createRouter, createWebHashHistory } from 'vue-router';
// import HomeView from '@/views/HomeView.vue'; // ⭐⭐⭐ 더 이상 App.vue에서 직접 렌더링되지 않으므로 임포트 경로가 달라집니다. ⭐⭐⭐
// ⭐⭐⭐ MainLayout 컴포넌트 임포트 (아래 새로 만들 예정) ⭐⭐⭐
import MainLayout from '@/views/MainLayout.vue'; 

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
    // ⭐⭐⭐ / 경로를 MainLayout으로 변경하고 HomeView를 자식으로 추가합니다. ⭐⭐⭐
    path: '/',
    // name: 'home', // MainLayout이 최상위이므로 name은 MainLayout의 자식 라우트에 부여
    component: MainLayout, // HomeView 대신 MainLayout을 렌더링
    children: [
      {
        path: '', // '/' 경로 자체에 매핑
        name: 'home', // HomeView는 이제 MainLayout의 자식 라우트입니다.
        component: () => import('../views/HomeView.vue'), // ⭐⭐⭐ HomeView 임포트는 그대로 유지 ⭐⭐⭐
      },
      // 다른 본 사이트 페이지들도 여기에 자식 라우트로 추가할 수 있습니다.
    ]
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
  history: createWebHashHistory(), // 이 부분은 그대로 유지
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