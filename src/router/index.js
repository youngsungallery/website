import { createRouter, createWebHistory } from 'vue-router';
// 메인 웹사이트는 HomeView.vue 하나만 라우터에 연결!
import HomeView from '@/components/HomeView.vue'; // HomeView.vue는 src/components/ 에 있다고 가정
import auth from '@/stores/auth'; // Auth Store 임포트 (경로 유지)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    // 관리자 페이지는 @/admin/views/AdminPage.vue 에 있다고 가정
    component: () => import('@/admin/views/AdminPage.vue'), 
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 전역 네비게이션 가드 추가 (이 로직은 그대로 유지)
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