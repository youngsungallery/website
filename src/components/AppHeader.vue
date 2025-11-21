<template>
  <nav class="main-nav">
    <ul>
      <!-- ⭐️ '/#app' 대신 현재 경로의 '#'으로 이동하도록 수정 (대개 '#app'은 전체 앱의 id이므로 스크롤용으로 부적합) ⭐️ -->
      <!-- Vue Router에서 현재 경로를 유지하면서 해시만 바꾸려면 { path: '/' }와 hash를 조합 -->
      <!-- to="/"는 홈 라우트로 이동 -->
      <li><router-link to="/" class="brand-logo">영선갤러리</router-link></li>

      <!-- ⭐️⭐️⭐️ 여기가 가장 중요! router-link에 { path: '/', hash: '#섹션ID' } 사용 ⭐️⭐️⭐️ -->
      <!-- 이렇게 하면 Vue Router가 URL의 hash 부분만 변경하고, HomeView를 유지하면서 scrollBehavior를 통해 스크롤합니다. -->
      <li><router-link :to="{ path: '/', hash: '#exhibition-schedule' }">전시 일정</router-link></li>
      <li><router-link :to="{ path: '/', hash: '#exhibition-history' }">전시 이력</router-link></li>
      <li><router-link :to="{ path: '/', hash: '#lecture-history' }">특강 이력</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
// 이 컴포넌트에는 특별히 복잡한 스크립트 로직이 필요 없어!
</script>

<style lang="scss" scoped>
@use '../assets/styles/_appHeader.scss'; // ✨ @import 대신 @use 사용! ✨
// @use는 파일을 한번만 로드하고, 변수/믹스인 같은 멤버에 접근할 때 네임스페이스를 제공하지만,
// 단순 스타일을 가져올 때는 거의 @import와 유사하게 동작해.
</style>