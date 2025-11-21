<!-- website/src/views/HomeView.vue -->
<template>
  <div>
    <!-- ⭐️⭐️⭐️ 각 컴포넌트를 감싸는 태그에 id를 부여합니다! ⭐️⭐️⭐️ -->
    <section id="exhibition-schedule">
      <ExhibitionSchedule />
    </section>

    <section id="exhibition-history">
      <ExhibitionHistory />
    </section>

    <section id="lecture-history">
      <LectureHistory />
    </section>
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