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
import { onMounted } from 'vue'; // ✨ onMounted 훅 임포트 ✨

// ✨ Netlify Identity 초기화 및 위젯 열기 코드 시작 ✨
onMounted(() => {
  // window.netlifyIdentity 객체가 로드되었는지 확인
  if (window.netlifyIdentity) {
    // 1. Identity 위젯 초기화 (위젯이 DOM에 자신을 삽입하도록 함)
    //    이게 있어야 위젯이 화면에 나타날 가능성이 높아!
    window.netlifyIdentity.init(); 

    // 2. Identity 위젯이 완전히 초기화되었을 때 콜백
    window.netlifyIdentity.on("init", user => {
      console.log("Netlify Identity initialized:", user); // 콘솔에서 초기화 확인
      if (!user) {
        // 사용자가 로그인되어 있지 않다면 (로그인 UI가 나타나야 할 때)
        // 위젯을 강제로 열어보자 (테스트 목적)
        // window.netlifyIdentity.open(); // 이 줄을 활성화하면 페이지 로드 시 바로 위젯이 열려 로그인 창 뜸.
                                      // 일단은 주석 처리하여 기본 상태를 보고, 필요시 활성화.
      }
    });

    // 3. (선택 사항) 로컬 테스트 시 바로 위젯을 열고 싶다면 아래 주석 해제
    // window.netlifyIdentity.open(); 
  } else {
    console.error('Netlify Identity widget script not found in window.');
    console.log('Ensure the script tag is correctly placed in index.html and loaded.');
  }
});
// ✨ Netlify Identity 초기화 및 위젯 열기 코드 끝 ✨

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