import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import auth from '@/stores/auth'; // ✨ Auth Store 임포트 ✨

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/exhibition-history',
    name: 'exhibition-history',
    component: () => import('../views/ExhibitionHistory.vue')
  },
  {
    path: '/lecture-history',
    name: 'lecture-history',
    component: () => import('../views/LectureHistory.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  },
  // ✨ 관리자 페이지 라우트 추가 및 보호 설정 ✨
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/admin/views/AdminPage.vue'),
    meta: { requiresAuth: true } // 이 라우트에는 인증이 필요함을 명시!
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// ✨ 전역 네비게이션 가드 추가 ✨
router.beforeEach((to, from, next) => {
  // 라우트 메타 필드에서 'requiresAuth'가 true인지 확인
  if (to.meta.requiresAuth) {
    if (auth.isAuthenticated()) {
      // 토큰이 존재하면, 토큰을 디코딩하여 'admin' 역할인지 추가 검증
      // 실제로는 백엔드에서 토큰 유효성 및 역할을 검증하는 API를 호출해야 가장 안전함.
      // 여기서는 클라이언트 측에서 토큰 디코딩하여 역할 검증 (보안에 취약할 수 있음)
      try {
        const decodedToken = JSON.parse(atob(auth.token.value.split('.')[1]));
        if (decodedToken.role === 'admin') {
          next(); // 관리자 토큰이면 계속 진행
        } else {
          console.log('Access Denied: Not an admin role.');
          alert('관리자 권한이 없습니다.');
          auth.logout(); // 관리자가 아니면 로그아웃
          next('/'); // 메인 페이지로 리디렉션
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
      next('/'); // 토큰이 없으면 로그인 페이지 또는 메인 페이지로 리디렉션
    }
  } else {
    next(); // 인증이 필요 없는 라우트는 그냥 진행
  }
});


export default router;