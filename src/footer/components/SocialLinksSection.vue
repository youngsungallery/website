<!-- src/footer/components/SocialLinksSection.vue -->
<template>
  <div class="footer-section social-links">
    <a href="https://www.youtube.com/@%EC%98%81%EC%84%A0%EA%B0%A4%EB%9F%AC%EB%A6%AC" target="_blank" rel="noopener noreferrer">
      <!-- 유튜브 아이콘 적용 -->
      <img src="/youtube.png" class="icon" alt="YouTube icon" /> 영선갤러리 유튜브
    </a>
    <a href="https://open.kakao.com/o/gNPhwidf" target="_blank" rel="noopener noreferrer">
      <!-- 카카오톡 아이콘 적용 -->
      <img src="/kakaotalk.png" class="icon" alt="KakaoTalk icon" /> 영선갤러리 카카오톡
    </a>
  </div>
</template>

<script setup>
// 이 컴포넌트에는 특별한 스크립트 로직이 필요 없습니다.
</script>

<style scoped lang="scss">
@use '@/footer/style/_social-links-section.scss';
</style>