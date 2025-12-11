<!-- src/App.vue -->
<template>
  <div id="app-container">
    <router-view /> <!-- 모든 최상위 라우트(MainLayout, AdminLayout)가 여기에 렌더링됩니다. -->
  </div>
</template>

<script setup>
// ⭐⭐⭐ 모든 임포트(MainHeader, TheFooter, useRoute, computed 등)를 제거합니다! ⭐⭐⭐
// 오직 전역 스타일만 임포트합니다.
import '@/styles/AppLayout.scss';
</script>

<style scoped>
/* App.vue에 직접적인 스타일은 거의 없습니다. */
/* AppLayout.scss에서 전역 스타일을 관리합니다. */
</style>