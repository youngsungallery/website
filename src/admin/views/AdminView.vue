<!-- src/admin/views/AdminView.vue (실제 대시보드 콘텐츠) -->
<template>
  <div class="admin-dashboard-content">
    <!-- 이 컴포넌트에는 관리자 대시보드의 실제 콘텐츠만 들어갑니다. -->
    <!-- '영선갤러리 관리 대시보드' 제목, 로그인 이메일, 로그아웃 버튼은 AdminHeader에만 있습니다. -->
    
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
// AdminHeader (AdminLayout에서 임포트)가 인증 상태 및 로그아웃을 처리하므로,
// AdminView.vue에서는 Firebase 관련 스크립트가 필요 없습니다.
</script>

<style scoped lang="scss">
@use '@/admin/styles/AdminDashboardContent.scss'; // 스타일 파일 임포트는 그대로 유지
</style>