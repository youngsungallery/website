<!-- src/footer/components/TechStackSection.vue -->
<template>
  <div class="footer-section tech-stack">
    <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
      <img src="/vite.svg" class="icon" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
      <img src="/vue.svg" class="icon" alt="Vue logo" />
    </a>
    <span>Powered by Vite & Vue</span>
  </div>
</template>

<script setup>
// 이 컴포넌트에는 특별한 스크립트 로직이 필요 없습니다.
</script>

<style scoped lang="scss">
@use '@/footer/style/_tech-stack-section.scss';
</style>