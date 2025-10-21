<template>
  <div id="app">
    <!-- AppHeader 컴포넌트를 불러와서 사용 -->
    <AppHeader /> 

    <main>
      <ExhibitionSchedule />
      <ExhibitionHistory />
      <LectureHistory />
    </main>
  </div>
</template>

<script setup>
// 새로 만든 AppHeader 컴포넌트를 import!
import AppHeader from './components/AppHeader.vue';
import ExhibitionSchedule from './components/ExhibitionSchedule.vue';
import ExhibitionHistory from './components/ExhibitionHistory.vue';
import LectureHistory from './components/LectureHistory.vue';
</script>

<style>
@use '../assets/styles/_appHeader.scss';
/* 전역 스타일 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  scroll-behavior: smooth;
}

#app {
  text-align: center;
  color: #2c3e50;
  /* AppHeader가 fixed로 되어있어 콘텐츠가 겹칠 수 있으므로 padding-top을 추가해줘 */
  padding-top: 80px; /* main-nav의 대략적인 높이 + 여백 */
}

/* App.vue에 있던 내비게이션 관련 스타일은 AppHeader.vue로 이동했어. */

</style>