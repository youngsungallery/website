<!-- src/views/MainLayout.vue -->
<template>
  <div class="main-layout-wrapper">
    <MainHeader />
    <router-view /> <!-- HomeView 또는 다른 본 사이트 페이지 뷰가 여기에 렌더링됩니다. -->
    <TheFooter />
  </div>
</template>

<script setup>
import MainHeader from '@/components/MainHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<style scoped lang="scss">
/* MainLayout에 대한 기본 스타일. 필요시 외부 SCSS 파일로 분리. */
.main-layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}
</style>