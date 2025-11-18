<!-- website/src/admin/views/AdminPage.vue -->
<template>
  <div class="admin-page">
    <h1>관리자 페이지</h1>
    <p>여기는 관리자만 접근해야 하는 페이지입니다. 현재는 임시 화면입니다.</p>
    <p>인증 기능은 다음 단계에서 추가될 예정입니다.</p>
    <!-- 관리자 기능 UI가 여기에 들어갈 예정 -->
  </div>
</template>

<script setup>
// 관리자 페이지 스크립트
</script>

<style lang="scss" scoped>
/* 관리 페이지 전용 스타일 */
.admin-page {
  padding-top: 100px; /* 헤더와의 간격 고려 */
  text-align: center;
  background-color: #f0f8ff; /* 관리 페이지임을 시각적으로 구분 */
  min-height: calc(100vh - 180px); /* 푸터 높이 고려하여 최소 높이 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.admin-page h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.admin-page p {
  color: #555;
  font-size: 1.1em;
}
</style>