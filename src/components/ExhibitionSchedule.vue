<template>
  <section id="exhibition-schedule" class="section">
    <h2>전시 일정</h2>
    <p>최근 전시 일정을 보실 수 있습니다.</p>

    <!-- 로딩, 에러 처리 -->
    <div v-if="loading" class="loading">전시/특강 정보를 불러오는 중입니다...</div>
    <div v-else-if="error" class="error">정보를 불러오는데 오류가 발생했습니다: {{ error }}</div>
    
    <!-- ✨ 전시 정보 표시 영역 ✨ -->
    <div v-else-if="currentExhibition" class="current-exhibition-card">
      <div class="card-thumbnail">
        <img v-if="currentExhibition.image" :src="currentExhibition.image" :alt="currentExhibition.title + ' 포스터'" class="card-poster">
      </div>
      <div class="card-details">
        <h3>{{ currentExhibition.title }}</h3>
        <p v-if="currentExhibition.date" class="card-date">{{ currentExhibition.date }}</p>
        <p v-if="currentExhibition.desc" class="card-description">{{ currentExhibition.desc }}</p>
      </div>
    </div>
    <div v-else-if="!currentExhibition && !currentLecture" class="no-data">등록된 전시/특강 일정이 없습니다.</div>
    
    <!-- ✨ 특강 정보 표시 영역 (전시 정보 아래에 추가) ✨ -->
    <div v-if="currentLecture" class="current-lecture-card">
      <div class="card-thumbnail">
        <img v-if="currentLecture.image" :src="currentLecture.image" :alt="currentLecture.title + ' 포스터'" class="card-poster">
      </div>
      <div class="card-details">
        <h3>{{ currentLecture.title }}</h3>
        <p v-if="currentLecture.SLI" class="card-instructor">강사: {{ currentLecture.SLI }}</p>
        <p v-if="currentLecture.date" class="card-date">{{ currentLecture.date }}</p>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentExhibition = ref(null); // 최신 전시 데이터
const currentLecture = ref(null);    // 최신 특강 데이터
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const exhibitionResponse = await fetch('/data/exhibitions.json'); 
    if (!exhibitionResponse.ok) {
      throw new Error(`Exhibition data HTTP error! status: ${exhibitionResponse.status}`);
    }
    const exhibitionData = await exhibitionResponse.json();
    if (exhibitionData && exhibitionData.length > 0) {
      currentExhibition.value = exhibitionData[0]; // 첫 번째 항목 (최신으로 가정)
    }

    const lectureResponse = await fetch('/data/lectures.json');
    if (!lectureResponse.ok) {
      throw new Error(`Lecture data HTTP error! status: ${lectureResponse.status}`);
    }
    const lectureData = await lectureResponse.json();
    if (lectureData && lectureData.length > 0) {
      currentLecture.value = lectureData[0]; // 첫 번째 항목 (최신으로 가정)
    }

  } catch (err) {
    console.error("전시/특강 데이터를 가져오는 중 오류 발생:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
@use '../assets/styles/baseSection.scss';
@use '../assets/styles/_exhibitionSchedule.scss';

.loading, .error, .no-data {
  font-size: 1.2em;
  color: #777;
  text-align: center;
  padding: 50px;
}
</style>