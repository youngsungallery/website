<!-- src/footer/components/ContactInfoSection.vue -->
<template>
  <div class="footer-section contact-info">
    <p>
      <a href="https://naver.me/xzlgF1UM" target="_blank" rel="noopener noreferrer">
        경기 수원시 영통구 덕영대로 1471번길 2층
        <span class="icon">🗺️</span> <!-- 지도 아이콘 -->
      </a>
    </p>
    <p>
      <a href="tel:031-203-1089">
        031-203-1089
        <span class="icon">📞</span> <!-- 전화 아이콘 -->
      </a>
    </p>
  </div>
</template>

<script setup>
// 이 컴포넌트에는 특별한 스크립트 로직이 필요 없습니다.
</script>

<style scoped lang="scss">
@use '@/footer/style/_contact-info-section.scss';
</style>