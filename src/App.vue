<template>
  <div id="app">
    <AppHeader /> 

    <main>
      <router-view /> 
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
// ✨ 중요: ExhibitionSchedule, ExhibitionHistory, LectureHistory는 이제 App.vue에서 직접 임포트하지 않아! ✨
// ✨ 이 컴포넌트들은 HomeView.vue 안에서 임포트될 거야. ✨
</script>

<style lang="scss">
/* 전역 스타일 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  scroll-behavior: smooth;
  overflow-x: hidden;
}

#app {
  text-align: center;
  color: #2c3e50;
  max-width: 100vw;
  overflow-x: hidden;
}
</style>