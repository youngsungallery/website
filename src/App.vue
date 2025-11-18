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
      if (!user) {
        // ✨ 이 부분의 주석을 해제해서 위젯을 명시적으로 열도록 변경! ✨
        window.netlifyIdentity.open(); // 페이지 로드 시 바로 위젯(로그인 창)이 열려!
      }
    });

    // ✨ 페이지 로드 시 무조건 위젯을 열고 싶으면 아래 주석 해제 (테스트 목적) ✨
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