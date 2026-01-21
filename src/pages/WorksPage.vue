<!-- src/pages/WorksPage.vue -->
<template>
  <section class="works">
    <header class="page-head">
      <h2 class="page-title">작품</h2>
    </header>

    <!-- 작품 리스트 -->
    <section class="works-grid">
      <div class="work-card" v-for="n in 12" :key="n">
        <div class="work-image">
          <div class="image-placeholder">YS###</div>
        </div>

        <div class="work-meta">
          <p class="work-title">작품 제목</p>
          <p class="work-info">재료 · 사이즈 · 연도</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
</script>

<style scoped>
.works {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.page-title {
  font-size: 22px;
  font-weight: 600;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 28px;
}

.image-placeholder {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 12px;
  margin-bottom: 10px;
}

.work-title {
  font-size: 14px;
  margin-bottom: 4px;
}

.work-info {
  font-size: 12px;
  color: #777;
}
</style>
