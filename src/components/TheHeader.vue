<!-- src/components/TheHeader.vue -->
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
// Header 컴포넌트에 필요한 스크립트 로직 (현재는 비어 있음)
</script>

<style scoped lang="scss">
@use '@/styles/TheHeader.scss'; /* <<-- 여기에서 외부 SCSS 파일을 임포트합니다! */
</style>