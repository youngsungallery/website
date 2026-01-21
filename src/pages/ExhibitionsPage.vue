<!-- src/pages/ExhibitionsPage.vue -->
<template>
  <section class="exhibitions">
    <header class="page-head">
      <h2 class="page-title">전시</h2>
    </header>

    <!-- 진행중 전시 -->
    <section class="section">
      <h3 class="section-title">진행중</h3>
      <div class="grid">
        <div class="poster-card" v-for="n in 2" :key="'ongoing-' + n">
          <div class="poster-placeholder">POSTER</div>
          <p class="poster-title">전시 제목</p>
          <p class="poster-period">2026.06 – 2026.07</p>
        </div>
      </div>
    </section>

    <!-- 예정 전시 -->
    <section class="section">
      <h3 class="section-title">예정</h3>
      <div class="grid">
        <div class="poster-card" v-for="n in 3" :key="'upcoming-' + n">
          <div class="poster-placeholder">POSTER</div>
          <p class="poster-title">예정 전시</p>
          <p class="poster-period">2026.08</p>
        </div>
      </div>
    </section>

    <!-- 종료 전시 -->
    <section class="section">
      <h3 class="section-title">종료</h3>
      <div class="grid archive">
        <div class="poster-card" v-for="n in 4" :key="'ended-' + n">
          <div class="poster-placeholder">POSTER</div>
          <p class="poster-title">종료 전시</p>
          <p class="poster-period">2025</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
</script>

<style scoped>
.exhibitions {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.page-title {
  font-size: 22px;
  font-weight: 600;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
}

.poster-placeholder {
  width: 100%;
  aspect-ratio: 3 / 4;
  background: #f2f2f2;
  margin-bottom: 10px;
}

.poster-title {
  font-size: 14px;
  margin-bottom: 4px;
}

.poster-period {
  font-size: 12px;
  color: #777;
}

.archive {
  opacity: 0.75;
}
</style>
