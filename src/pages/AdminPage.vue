<!-- src/pages/AdminPage.vue -->
<template>
  <section class="admin">
    <header class="page-head">
      <div class="head-left">
        <h2 class="page-title">관리자 페이지</h2>
        <p class="page-desc">영선갤러리 관리 영역입니다.</p>
      </div>

      <!-- ✅ 컴포넌트로 교체 -->
      <StorageUsageBox />
    </header>

    <section class="admin-content">
      <RouterLink to="/admin/exhibitions" class="admin-card">
        <h3 class="card-title">전시 관리</h3>
        <p class="card-desc">전시 등록 및 수정</p>
      </RouterLink>

      <RouterLink to="/admin/works" class="admin-card">
        <h3 class="card-title">작품 관리</h3>
        <p class="card-desc">작품 등록 및 상태 관리</p>
      </RouterLink>

      <RouterLink to="/admin/inquiries" class="admin-card">
        <h3 class="card-title">문의 관리</h3>
        <p class="card-desc">구입 문의 확인 및 답변</p>
      </RouterLink>
    </section>
  </section>
</template>

<script setup>
import StorageUsageBox from "@/components/admin/StorageUsageBox.vue";
</script>

<style scoped>
.admin {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.page-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.head-left {
  min-width: 0;
}

.page-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 13px;
  color: #666;
}

.admin-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

/* 카드 = 링크 */
.admin-card {
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 20px;
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.12s ease, border-color 0.12s ease,
    box-shadow 0.12s ease;
}

.admin-card:hover {
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  transform: translateY(-1px);
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
}

.card-desc {
  font-size: 13px;
  color: #777;
}

@media (max-width: 780px) {
  .page-head {
    flex-direction: column;
  }

  /* StorageUsageBox 자체가 width:340이라 모바일에서는 자연스럽게 내려오고,
     필요하면 StorageUsageBox를 props로 width 100% 스타일로 바꿔도 됨 */
}
</style>
