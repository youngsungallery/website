<template>
  <div id="app-container">
    <!-- 라우팅된 컴포넌트(HomeView, AdminView 등)가 표시될 위치 -->
    <router-view />

    <!-- 푸터 섹션: Vite와 Vue 아이콘 및 텍스트 포함 -->
    <footer class="app-footer">
      <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
        <img src="/vite.svg" class="logo vite-logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
        <!-- './assets/vue.svg' -> '/vue.svg' 로 수정! -->
        <img src="/vue.svg" class="logo vue-logo" alt="Vue logo" /> 
      </a>
      <span>Powered by Vite & Vue</span>
    </footer>
  </div>
</template>

<script setup>
// 향후 전역 스타일 및 기타 스크립트 로직 추가
// import './style.css'; // 이 파일은 나중에 정리할 예정
import '@/styles/TheFooter.scss'; // 푸터 스타일 임포트

// 컴포넌트 스크립트 로직 추가
</script>