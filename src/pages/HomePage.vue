<!-- src/pages/HomePage.vue -->
<template>
  <section class="home">
    <!-- 메인 전시 포스터 영역 -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-poster">
          <!-- 메인 전시 포스터 이미지 들어갈 자리 -->
          <div class="poster-placeholder">
            MAIN EXHIBITION POSTER
          </div>
        </div>

        <div class="hero-meta">
          <h2 class="title">현재 전시 제목</h2>
          <p class="period">2026.06.01 – 2026.07.15</p>
          <p class="desc">
            전시 간단 설명 또는 큐레이션 문구
          </p>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 80px;
}

/* Hero */
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 40px;
  align-items: center;
}

.poster-placeholder {
  width: 100%;
  aspect-ratio: 3 / 4;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 13px;
  letter-spacing: 0.1em;
}

.hero-meta .title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
}

.hero-meta .period {
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
}

.hero-meta .desc {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}
</style>
