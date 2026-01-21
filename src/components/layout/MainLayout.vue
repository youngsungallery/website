<!-- src/components/layout/MainLayout.vue -->
<template>
  <div class="layout">
    <header class="site-header">
      <h1 class="logo">영선갤러리</h1>
    </header>

    <main>
      <slot /> <!-- 페이지 내용은 여기로 -->
    </main>

    <footer class="site-footer">
      <p>© Youngsun Gallery</p>
    </footer>
  </div>
</template>

<script setup>
// 레이아웃 전용
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.site-header {
  padding: 24px 20px;
  text-align: center;
}

.logo {
  font-size: 20px;
  font-weight: 600;
}

.site-footer {
  margin-top: auto;
  padding: 40px 20px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
</style>
