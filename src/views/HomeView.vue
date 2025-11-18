<!-- website/src/views/HomeView.vue -->
<template>
  <div>
    <ExhibitionSchedule />
    <ExhibitionHistory />
    <LectureHistory />
  </div>
</template>

<script setup>
// HomeView에서 사용할 컴포넌트들을 임포트해야 해
import ExhibitionSchedule from '../components/ExhibitionSchedule.vue';
import ExhibitionHistory from '../components/ExhibitionHistory.vue';
import LectureHistory from '../components/LectureHistory.vue';
</script>

<style scoped>
/* HomeView 전용 스타일이 필요하면 여기에 추가 */
</style>