<!-- src/admin/views/AdminView.vue -->
<template>
  <div class="admin-view">
    <div v-if="!isAuthReady">
      <p>인증 상태 확인 중...</p>
    </div>
    <div v-else-if="isAuthenticated">
      <h1>관리자 대시보드</h1>
      <p>환영합니다, {{ userEmail }} 님!</p>
      <button @click="handleLogout">로그아웃</button>

      <!-- 관리자 기능 추가 예정 -->
      <section class="admin-content">
        <h2>전시 관리</h2>
        <p>전시 데이터를 추가, 수정, 삭제할 수 있습니다.</p>
        <!-- 여기에 전시 관리 컴포넌트를 추가할 예정 -->
      </section>

      <section class="admin-content">
        <h2>강의 관리</h2>
        <p>강의 데이터를 추가, 수정, 삭제할 수 있습니다.</p>
        <!-- 여기에 강의 관리 컴포넌트를 추가할 예정 -->
      </section>

      <!-- 기타 관리 기능들 -->

    </div>
    <div v-else>
      <!-- 로그인되지 않은 경우 AdminLogin 컴포넌트를 표시 -->
      <AdminLogin />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/plugins/firebase'; // Firebase auth 인스턴스 임포트
import { onAuthStateChanged, signOut } from 'firebase/auth'; // 로그인 상태 변경 리스너와 로그아웃 함수 임포트

import AdminLogin from '@/admin/components/AdminLogin.vue'; // AdminLogin 컴포넌트 임포트

const router = useRouter();
const isAuthenticated = ref(false); // 사용자 인증 상태
const isAuthReady = ref(false);      // Firebase 인증 초기화 완료 상태
const userEmail = ref('');           // 로그인한 사용자 이메일

// Firebase 인증 상태 변경 리스너
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true;
      userEmail.value = user.email;
      console.log("Firebase: 사용자 로그인됨 -", user.email);
    } else {
      isAuthenticated.value = false;
      userEmail.value = '';
      console.log("Firebase: 사용자 로그아웃됨");
    }
    isAuthReady.value = true; // 인증 상태 확인 완료
  });
});

const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("Firebase: 로그아웃 성공");
    // 로그아웃 후 로그인 페이지 또는 홈으로 리디렉션 (AdminLogin은 AdminView가 알아서 처리)
    router.push('/');
  } catch (error) {
    console.error("로그아웃 에러:", error);
  }
};
</script>

<style scoped lang="scss">
@use '@/admin/styles/AdminView.scss'; /* <<-- 여기에 외부 SCSS 파일을 임포트합니다! */
</style>