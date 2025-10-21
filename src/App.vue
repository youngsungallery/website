<template>
  <div id="app">
    <AppHeader /> 
    <main>
      <ExhibitionSchedule />
      <ExhibitionHistory />
      <LectureHistory />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue';
import ExhibitionSchedule from './components/ExhibitionSchedule.vue';
import ExhibitionHistory from './components/ExhibitionHistory.vue';
import LectureHistory from './components/LectureHistory.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<style lang="scss">
/* 전역 스타일 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  scroll-behavior: smooth;
  overflow-x: hidden; /* ✨ 가장 중요! 수평 스크롤 강제 숨김 ✨ */
}

#app {
  text-align: center; /* 앱의 전체 컨텐츠를 중앙 정렬 (이건 좌우 스크롤과 무관) */
  color: #2c3e50;
  padding-top: 80px;
  /* ✨ #app 자체가 좌우로 넘치지 않도록 최대 너비 설정 ✨ */
  max-width: 100vw; 
  overflow-x: hidden; /* ✨ 혹시 #app 내부에서 넘치더라도 숨김 ✨ */
}
</style>