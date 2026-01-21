<!-- src/pages/Home.vue -->
<template>
  <MainLayout>
    <section class="current-exhibition">
      <div class="poster-wrap"></div>

      <div class="exhibition-info">
        <h1 class="title"></h1>
        <p class="period"></p>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/components/layout/MainLayout.vue'
</script>

<style scoped>
.current-exhibition {
  max-width: 640px;
  width: 100%;
  margin: 60px auto;
  text-align: center;
}

.poster-wrap {
  width: 100%;
  aspect-ratio: 3 / 4;
  background-color: #f5f5f5;
}

.exhibition-info {
  margin-top: 24px;
}

.title {
  height: 24px;
}

.period {
  height: 14px;
}
</style>
