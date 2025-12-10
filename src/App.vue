<template>
  <div id="app-container">
    <!-- 라우팅된 컴포넌트(HomeView, AdminView 등)가 표시될 위치 -->
    <router-view />
    <!-- 푸터 컴포넌트 -->
    <TheFooter />
  </div>
</template>

<script setup>
import TheFooter from '@/components/TheFooter.vue'; // TheFooter 컴포넌트 임포트
import '@/styles/AppLayout.scss'; // App.vue의 레이아웃 스타일 임포트

// 향후 전역 스타일 및 기타 스크립트 로직 추가
</script>