import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue'; // ✨ 경로 수정! ✨
import auth from '@/stores/auth'; // Auth Store 임포트

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue') // ✨ 경로 수정! ✨
  },
  {
    path: '/exhibition-history',
    name: 'exhibition-history',
    component: () => import('@/views/ExhibitionHistory.vue') // ✨ 경로 수정! ✨
  },
  {
    path: '/lecture-history',
    name: 'lecture-history',
    component: () => import('@/views/LectureHistory.vue') // ✨ 경로 수정! ✨
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue') // ✨ 경로 수정! ✨
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/admin/views/AdminPage.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 전역 네비게이션 가드 추가
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (auth.isAuthenticated()) {
      try {
        const decodedToken = JSON.parse(atob(auth.token.value.split('.')[1]));
        if (decodedToken.role === 'admin') {
          next();
        } else {
          console.log('Access Denied: Not an admin role.');
          alert('관리자 권한이 없습니다.');
          auth.logout();
          next('/');
        }
      } catch (error) {
        console.error('Error decoding auth token:', error);
        alert('유효하지 않은 인증 정보입니다. 다시 로그인해주세요.');
        auth.logout();
        next('/');
      }
    } else {
      console.log('Access Denied: No authentication token found.');
      alert('로그인이 필요합니다.');
      next('/');
    }
  } else {
    next();
  }
});

export default router;