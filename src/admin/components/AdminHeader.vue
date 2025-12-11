<!-- src/admin/components/AdminHeader.vue -->
<template>
  <header class="admin-top-header">
    <div class="header-left">
      <h1>영선갤러리 관리 대시보드</h1>
    </div>
    <div class="header-right">
      <span class="user-info">{{ userEmail }}</span>
      <button @click="handleLogout" class="logout-button">로그아웃</button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // 로그아웃을 위해 useRouter 필요
import { auth } from '@/plugins/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const router = useRouter();
const userEmail = ref(''); // 사용자 이메일 정보를 AdminHeader에서 관리

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userEmail.value = user.email;
    } else {
      userEmail.value = '';
      // ⭐⭐ 로그아웃되었거나 세션이 만료되면 로그인 페이지로 이동 ⭐⭐
      // AdminLayout에서 isAuthenticated를 통해 AdminLogin이 보이므로, 여기서는 홈으로 푸시
      router.push('/'); 
    }
  });
});

const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("Firebase: 로그아웃 성공 (AdminHeader)");
    router.push('/'); // 로그아웃 시 본 사이트 홈으로 이동
  } catch (error) {
    console.error("로그아웃 에러 (AdminHeader):", error);
  }
};
</script>

<style scoped lang="scss">
@use '@/admin/styles/AdminHeader.scss'; // ⭐⭐ 스타일 파일 임포트 ⭐⭐
</style>