<!-- src/admin/views/AdminLayout.vue -->
<template>
  <div class="admin-layout-wrapper">
    <div v-if="!isAuthReady">
      <p class="loading-message">인증 상태 확인 중...</p>
    </div>
    <div v-else-if="isAuthenticated" class="admin-main-layout">
      <AdminSidebar />
      <main class="admin-content-area">
        <!-- ⭐⭐⭐ 메인 영역에 있던 헤더처럼 보이던 내용 (admin-content-header div)을 완전히 제거합니다. ⭐⭐⭐ -->
        <router-view /> <!-- 실제 대시보드 콘텐츠(AdminView)만 여기에 표시됩니다. -->
      </main>
    </div>
    <div v-else class="admin-login-area">
      <AdminLogin />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // 로그아웃을 위해 필요
import { auth } from '@/plugins/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// AdminLayout에서 인증 상태만 관리하고, userEmail과 handleLogout 로직은 필요 없다면 삭제
const router = useRouter();
const isAuthenticated = ref(false);
const isAuthReady = ref(false);
// const userEmail = ref(''); // 더 이상 AdminLayout에서 표시하지 않는다면 제거
// const handleLogout = async () => { /* ... */ }; // 더 이상 AdminLayout에서 표시하지 않는다면 제거

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user;
    // userEmail.value = user ? user.email : ''; // 제거한다면
    isAuthReady.value = true;
  });
});

import AdminSidebar from '@/admin/components/AdminSidebar.vue';
import AdminLogin from '@/admin/components/AdminLogin.vue';
</script>

<style scoped lang="scss">
@use '@/admin/styles/AdminLayout.scss';
</style>