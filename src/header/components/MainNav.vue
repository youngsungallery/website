<!-- src/header/components/MainNav.vue -->
<template>
  <nav class="main-nav">
    <ul>
      <li>
        <RouterLink to="/exhibitions" class="nav-link">
          <span>전시</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/artworks" class="nav-link">
          <span>작품</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// 스크립트 블록은 현재 비어있습니다.
</script>

<style scoped lang="scss">
@use '@/header/style/_main-nav.scss'; // _main-nav.scss 파일은 그대로 @use 합니다.
</style>