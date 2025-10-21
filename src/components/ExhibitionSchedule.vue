<template>
  <section id="exhibition-schedule" class="section">
    <h2>전시 일정</h2>
    <p>다가오는 전시 정보를 여기에 표시할 예정입니다.</p>
    <div style="height: 500px; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center;">
      <!-- 전시 일정 데이터가 들어갈 공간 -->
      <p>전시 일정 내용</p>
    </div>
  </section>
</template>

<script setup>
// 필요한 스크립트 로직 (데이터 불러오기 등)
</script>

<style lang="scss" scoped>
@use '../assets/styles/baseSection.scss'; // ✨ @import 대신 @use 사용! ✨

#exhibition-schedule {
  background-color: #fff;
}
</style>