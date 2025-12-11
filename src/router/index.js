// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue'; // 기존: 상대 경로 (주석 처리 또는 삭제)
import HomeView from '@/views/HomeView.vue'; // ⭐⭐⭐ 이 경로로 변경 ⭐⭐⭐

import { auth } from '@/plugins/firebase'; // Firebase auth 인스턴스 임포트
import { onAuthStateChanged } from 'firebase/auth'; // 인증 상태 변경 리스너 임포트

// 이 함수는 Firebase 인증 상태가 변경될 때까지 대기합니다.
// 앱이 처음 로드될 때 인증 상태를 정확히 파악하기 위함입니다.
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    // onAuthStateChanged는 초기 상태를 한 번 호출하므로,
    // Promise 내에서 이 호출을 처리하고 바로 unsubscribe합니다.
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe(); // 한 번만 실행되도록 구독 해제
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
    path: '/admin', // 관리자 페이지 경로
    name: 'admin',
    component: () => import('../admin/views/AdminView.vue'),
    meta: {
      requiresAuth: true, // 이 라우트에는 인증이 필요함을 표시
    },
  },
  // 다른 라우트들...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ⭐⭐⭐ 네비게이션 가드 구현 ⭐⭐⭐
router.beforeEach(async (to, from, next) => {
  // 인증이 필요한 페이지로 이동할 때
  if (to.meta.requiresAuth) {
    const user = await getCurrentUser(); // Firebase 인증 상태 비동기적으로 가져오기
    if (!user) { // 로그인되지 않은 경우
      console.log('Firebase: 관리 페이지 접근 시도, 로그인 필요');
      // AdminView.vue에서 로그인 컴포넌트를 표시하므로, 바로 AdminView로 이동
      // (AdminView 내에서 로그인 여부에 따라 AdminLogin 컴포넌트를 보여줌)
      next();
    } else { // 로그인된 경우
      console.log(`Firebase: 관리 페이지 접근 허용: ${user.email}`);
      next(); // 정상적으로 다음 라우트로 이동
    }
  } else { // 인증이 필요 없는 페이지는 그대로 이동
    next();
  }
});

export default router;