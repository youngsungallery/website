<template>
  <div id="app-container">
    <!-- 라우팅된 컴포넌트(HomeView, AdminView 등)가 표시될 위치 -->
    <router-view />
    <p style="text-align: center; color: green; font-weight: bold; margin-top: 20px;">
      영선갤러리 - 최신 자동 배포 테스트 성공!
    </p>

    <!-- 푸터 컴포넌트 -->
    <TheFooter />
  </div>
</template>

<script setup>
import TheFooter from '@/components/TheFooter.vue'; // TheFooter 컴포넌트 임포트
import '@/styles/AppLayout.scss'; // App.vue의 레이아웃 스타일 임포트

// 향후 전역 스타일 및 기타 스크립트 로직 추가
</script>