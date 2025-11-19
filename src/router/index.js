import { createRouter, createWebHistory } from 'vue-router';
// HomeView.vue는 views 폴더에 있다고 명시적으로 임포트!
import HomeView from '@/views/HomeView.vue'; 
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
    // 관리자 페이지는 @/admin/views/ 에 있다고 확인
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
  if (to.meta.requiresAuth) { // 라우트 메타 필드에 requiresAuth: true 로 되어 있으면 보호 로직 실행!
    if (auth.isAuthenticated()) { // 인증 토큰이 localStorage에 있는지 확인!
      try {
        const decodedToken = JSON.parse(atob(auth.token.value.split('.')[1]));
        if (decodedToken.role === 'admin') { // 토큰 안의 역할이 'admin'인지 확인!
          next(); // 관리자 토큰이면 계속 진행
        } else {
          // 관리자 권한이 없으면
          console.log('Access Denied: Not an admin role.');
          alert('관리자 권한이 없습니다.');
          auth.logout(); 
          next('/'); // 메인 페이지로 리디렉션 (이건 그대로 유지)
        }
      } catch (error) {
        // 토큰이 유효하지 않으면
        console.error('Error decoding auth token:', error);
        alert('유효하지 않은 인증 정보입니다. 다시 로그인해주세요.');
        auth.logout();
        next('/'); // 메인 페이지로 리디렉션 (이것도 그대로 유지)
      }
    } else { // ✨ 토큰이 없으면 ✨
      console.log('Access Denied: No authentication token found.');
      alert('로그인이 필요합니다.');
      // ✨ 여기서 next('/') 대신 next()를 호출하여 admin 페이지에 머무르게 합니다. ✨
      // AdminPage.vue에 로그인 버튼이 있으므로, 거기서 로그인하도록 유도.
      next(); 
    }
  } else {
    next(); // 인증이 필요 없는 라우트는 그냥 진행
  }
});

export default router;