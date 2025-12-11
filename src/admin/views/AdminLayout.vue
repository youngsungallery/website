<!-- src/admin/views/AdminLayout.vue -->
<template>
  <div class="admin-layout-wrapper">
    <div v-if="!isAuthReady">
      <p class="loading-message">인증 상태 확인 중...</p>
    </div>
    <div v-else-if="isAuthenticated" class="admin-main-layout">
      <!-- ⭐⭐⭐ 상단에 AdminHeader 컴포넌트를 다시 포함 ⭐⭐⭐ -->
      <AdminHeader /> 
      <AdminSidebar />
      <main class="admin-content-area">
        <router-view />
      </main>
    </div>
    <div v-else class="admin-login-area">
      <AdminLogin />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '@/plugins/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// AdminHeader, AdminSidebar, AdminLogin 컴포넌트를 다시 임포트
import AdminHeader from '@/admin/components/AdminHeader.vue'; // ⭐⭐ AdminHeader 다시 임포트 ⭐⭐
import AdminSidebar from '@/admin/components/AdminSidebar.vue';
import AdminLogin from '@/admin/components/AdminLogin.vue';

const isAuthenticated = ref(false);
const isAuthReady = ref(false);
// userEmail, handleLogout 로직은 AdminHeader로 다시 옮겨집니다.

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    console.log("AdminLayout onAuthStateChanged: user =", user);
    isAuthenticated.value = !!user;
    isAuthReady.value = true;
    console.log("AdminLayout isAuthenticated:", isAuthenticated.value);
  });
});

// AdminLayout은 인증 상태만 관리하고, 실제 로그아웃 액션은 AdminHeader에서 일어남.
// 따라서 AdminLayout에서는 handleLogout 로직을 제거.
</script>

<style scoped lang="scss">
@use '@/admin/styles/AdminLayout.scss';
</style>