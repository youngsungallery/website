<!-- src/header/MainHeader.vue -->
<template>
  <header class="app-header">
    <div class="header-inner">
      <HeaderLogo />
      <div class="header-right-group">
        <MainNav />
        <div class="header-right-utility">
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import HeaderLogo from '@/header/components/HeaderLogo.vue';
import MainNav from '@/header/components/MainNav.vue';
</script>

<style scoped lang="scss">
// ⭐⭐⭐ 이제 _main-header.scss를 직접 @use 합니다. ⭐⭐⭐
@use '@/header/style/_main-header.scss';
</style>