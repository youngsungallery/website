<!-- src/components/layout/MainLayout.vue -->
<template>
  <div class="layout">
    <header class="site-header">
      <h1 class="logo">영선갤러리</h1>
    </header>

    <main class="site-main">
      <slot />
    </main>

    <footer class="site-footer">
      <p>© Youngsun Gallery</p>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  padding: 24px 20px;
  text-align: center;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.site-main {
  flex: 1;
}

.site-footer {
  padding: 40px 20px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
</style>
