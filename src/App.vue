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
  if (window.netlifyIdentity) {
    window.netlifyIdentity.init(); 

    window.netlifyIdentity.on("init", user => {
      console.log("Netlify Identity initialized:", user);
      // if (!user) {
        // ✨ 이 부분의 주석을 다시 처리하거나 삭제! ✨
        // window.netlifyIdentity.open(); 
      // }
    });

    // ✨ 아래 줄도 만약 활성화되어 있었다면 주석 처리! ✨
    // window.netlifyIdentity.open(); 
  } else {
    console.error('Netlify Identity widget script not found in window.');
    console.log('Ensure the script tag is correctly placed in index.html and loaded.');
  }
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