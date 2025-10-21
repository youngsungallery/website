<template>
  <nav class="main-nav">
    <ul>
      <li><a href="#app" class="brand-logo">영선갤러리</a></li>
      <li><a href="#exhibition-schedule">전시 일정</a></li>
      <li><a href="#exhibition-history">전시 이력</a></li>
      <li><a href="#lecture-history">특강 이력</a></li>
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