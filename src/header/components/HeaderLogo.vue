<!-- src/header/components/HeaderLogo.vue -->
<template>
  <div class="header-logo-container">
    <RouterLink to="/" class="logo-link">
      <!-- 로고 이미지를 제거하고, 갤러리 이름만 남겨둡니다. -->
      <span class="site-name">영선갤러리</span>
    </RouterLink>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
@use '@/header/style/_header-logo.scss'; // 이제 전용 _header-logo.scss를 @use 합니다!
</style>