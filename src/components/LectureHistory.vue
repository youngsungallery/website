<template>
  <section id="lecture-history" class="section">
    <h2>특강 이력</h2>
    <p>지난 특강 기록들을 여기에 표시할 예정입니다.</p>

    <div class="lecture-list">
      <div v-if="loading" class="loading">특강 이력을 불러오는 중입니다...</div>
      <div v-else-if="error" class="error">특강 이력을 불러오는데 오류가 발생했습니다: {{ error }}</div>
      <div v-else-if="!loading && !error && allLectures.length === 0" class="no-data">아직 등록된 특강 이력이 없습니다.</div>
      <ul v-else class="lectures-grid">
        <li v-for="lecture in displayedLectures" :key="lecture.id" 
            class="lecture-item">
          
          <div class="item-details">
            <h3>{{ lecture.title }}</h3>
            <p v-if="lecture.SLI" class="item-instructor">강사: {{ lecture.SLI }}</p>
            <p v-if="lecture.date" class="item-date">{{ lecture.date }}</p>
          </div>
        </li>
      </ul>
      <button v-if="hasMoreLectures" @click="loadMoreLectures" class="load-more-btn">더보기</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const allLectures = ref([]);
const displayedCount = ref(6);
const loading = ref(true);
const error = ref(null);

const displayedLectures = computed(() => {
  return allLectures.value.slice(0, displayedCount.value);
});

const hasMoreLectures = computed(() => {
  return displayedCount.value < allLectures.value.length;
});

const loadMoreLectures = () => {
  displayedCount.value += 6;
};

onMounted(async () => {
  try {
    const response = await fetch('/data/lectures.json'); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    allLectures.value = data;
  } catch (err) {
    console.error("특강 이력 데이터를 가져오는 중 오류 발생:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
@use '../assets/styles/baseSection.scss';
@use '../assets/styles/_lectureHistory.scss';

.loading, .error, .no-data {
  font-size: 1.2em;
  color: #777;
  text-align: center;
  padding: 50px;
}
</style>