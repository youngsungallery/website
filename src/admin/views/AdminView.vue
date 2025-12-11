<!-- src/admin/views/AdminView.vue (순수 대시보드 콘텐츠) -->
<template>
  <div class="admin-dashboard-content">
    <!-- ⭐⭐⭐ 다시 추가했던 dashboard-header-area 내용을 여기서 모두 제거합니다! ⭐⭐⭐ -->
    <!-- AdminHeader에서 제목과 로그인 정보를 처리합니다. -->
    
    <section class="dashboard-section">
      <h2>전시 현황 요약</h2>
      <p>가장 최근 업데이트된 전시: [전시명]</p>
      <p>총 전시 수: N개</p>
      <!-- 향후 동적 데이터로 채울 예정 -->
    </section>

    <section class="dashboard-section">
      <h2>빠른 메뉴</h2>
      <div class="quick-links">
        <button class="quick-button">전시 추가</button>
        <button class="quick-button">강의 추가</button>
        <button class="quick-button">설정 열기</button>
      </div>
    </section>

    <!-- 기타 관리 기능들 -->
  </div>
</template>

<script setup>
// ⭐⭐⭐ Firebase 인증 관련 스크립트 로직을 모두 제거합니다! ⭐⭐⭐
// AdminHeader에서 로그인 및 로그아웃 관련 로직을 담당합니다.
</script>

<style scoped lang="scss">
@use '@/admin/styles/AdminDashboardContent.scss';
</style>