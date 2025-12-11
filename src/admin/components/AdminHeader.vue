<!-- src/admin/components/AdminHeader.vue -->
<template>
  <header class="admin-top-header">
    <div class="header-left">
      <h1>영선갤러리 관리 대시보드</h1>
    </div>
    <div class="header-right" v-if="isAuthenticated">
      <span class="user-info">{{ userEmail }}</span>
      <button @click="handleLogout" class="logout-button">로그아웃</button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // ref, onMounted 임포트
import { useRouter } from 'vue-router';
import { auth } from '@/plugins/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const router = useRouter();
const isAuthenticated = ref(false);
const userEmail = ref('');

// Firebase 인증 상태 변경 리스너
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true;
      userEmail.value = user.email;
    } else {
      isAuthenticated.value = false;
      userEmail.value = '';
    }
  });
});

const handleLogout = async () => {
  try {
    await signOut(auth);
    router.push('/'); // 로그아웃 시 본 사이트 홈으로 이동
  } catch (error) {
    console.error("로그아웃 에러:", error);
  }
};
</script>

<style scoped lang="scss">
@use '@/admin/styles/AdminHeader.scss'; // ⭐⭐ 스타일 파일 임포트 ⭐⭐
</style>