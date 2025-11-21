<!-- App.vue -->
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
import { onMounted } from 'vue'; 

onMounted(() => {
  // ⭐️⭐️⭐️ Netlify Identity 관련 코드들을 모두 제거하거나 주석 처리합니다! ⭐️⭐️⭐️
  /*
  if (window.netlifyIdentity) {
    window.netlifyIdentity.init(); 

    window.netlifyIdentity.on("init", user => {
      console.log("Netlify Identity initialized:", user);
    });
  } else {
    console.error('Netlify Identity widget script not found in window.');
    console.log('Ensure the script tag is correctly placed in index.html and loaded.');
  }
  */
  console.log("Vue App Mounted!"); // 앱 마운트 확인용 메시지 추가 (선택 사항)
});

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