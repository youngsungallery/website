<!-- src/components/MainHeader.vue -->
<template>
  <header class="app-header">
    <h1>영선갤러리</h1>
    <nav>
      <!-- 향후 메뉴 항목들이 들어갈 곳 -->
      <a href="#">전시</a>
      <a href="#">강의</a>
      <a href="#">소개</a>
    </nav>
  </header>
</template>

<script setup>
// 기존 isAdminRoute 관련 로직 모두 제거
// computed, useRoute 임포트 제거
</script>

<style scoped lang="scss">
@use '@/styles/MainHeader.scss'; /* ⭐⭐⭐ 스타일 파일 이름을 MainHeader.scss로 변경 ⭐⭐⭐ */
</style>