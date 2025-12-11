<template>
  <div id="app-container">
    <!-- ⭐⭐⭐ 여기에 조건부 헤더 렌더링 로직 추가 ⭐⭐⭐ -->
    <MainHeader v-if="!isAdminRoute" />
    <AdminHeader v-else />

    <!-- 라우팅된 컴포넌트(HomeView, AdminView 등)가 표시될 위치 -->
    <router-view />
    <!-- 푸터 컴포넌트 -->
    <TheFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'; // ⭐⭐⭐ computed 임포트 ⭐⭐⭐
import { useRoute } from 'vue-router'; // ⭐⭐⭐ useRoute 임포트 ⭐⭐⭐

import MainHeader from '@/components/MainHeader.vue'; // ⭐⭐⭐ MainHeader 임포트 ⭐⭐⭐
import AdminHeader from '@/admin/components/AdminHeader.vue'; // ⭐⭐⭐ AdminHeader 임포트 ⭐⭐⭐
import TheFooter from '@/components/TheFooter.vue';
import '@/styles/AppLayout.scss';

const route = useRoute(); // 현재 라우트 정보 가져오기

// 현재 라우트가 /admin으로 시작하는지 확인하는 computed 속성
const isAdminRoute = computed(() => route.path.startsWith('/admin'));
</script>

<style scoped>
/* App.vue에 직접적인 스타일은 거의 없습니다. */
/* AppLayout.scss에서 전역 스타일을 관리합니다. */
</style>