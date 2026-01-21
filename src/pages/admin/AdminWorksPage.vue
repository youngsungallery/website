<template>
  <section class="admin-page">
    <header class="page-head">
      <RouterLink to="/admin" class="home-link">← 관리자 홈</RouterLink>
      <h2 class="title">작품 관리</h2>
    </header>

    <p class="desc">작품 등록 및 상태 관리 기능을 여기에 연결합니다.</p>
  </section>
</template>

<script setup>
</script>

<style scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-head {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.home-link {
  font-size: 12px;
  color: #777;
  text-decoration: none;
}

.home-link:hover {
  color: #111;
}

.title {
  font-size: 18px;
  font-weight: 600;
}

.desc {
  font-size: 13px;
  color: #666;
}
</style>
