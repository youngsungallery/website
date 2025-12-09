<template>
  <footer class="app-footer">
    <hr class="footer-divider"> <!-- 첫 번째 구분선 (Copyright 위에) -->
    <div class="footer-section">
      <p>Copyright © 2025 Youngsun Gallery</p>
    </div>
    <div class="footer-section tech-stack">
      <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
        <img src="/vue.svg" class="logo" alt="Vue logo" />
      </a>
      <span>Powered by Vite & Vue</span>
    </div>
    <hr class="footer-divider"> <!-- 구분선 -->
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
    <hr class="footer-divider"> <!-- 구분선 -->
    <div class="footer-section social-links">
      <a href="https://www.youtube.com/@%EC%98%81%EC%84%A0%EA%B0%A4%EB%9F%AC%EB%A6%AC" target="_blank" rel="noopener noreferrer">
        <!-- 유튜브 아이콘 적용 -->
        <img src="/youtube.svg" class="social-icon" alt="YouTube icon" /> 영선갤러리 유튜브
      </a>
      <span> | </span>
      <a href="https://open.kakao.com/o/gNPhwidf" target="_blank" rel="noopener noreferrer">
        <!-- 카카오톡 아이콘 적용 -->
        <img src="/kakaotalk.svg" class="social-icon" alt="KakaoTalk icon" /> 영선갤러리 카카오톡
      </a>
    </div>
  </footer>
</template>

<script setup>
// TheFooter 컴포넌트에 필요한 스크립트 로직 (현재는 없음)
</script>