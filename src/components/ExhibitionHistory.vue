<template>
  <section id="exhibition-history" class="section">
    <h2>전시 이력</h2>
    <p>지난 전시 기록들을 여기에 표시할 예정입니다.</p>

    <div class="exhibition-list">
      <div v-if="loading" class="loading">전시 이력을 불러오는 중입니다...</div>
      <div v-else-if="error" class="error">전시 이력을 불러오는데 오류가 발생했습니다: {{ error }}</div>
      <div v-else-if="!loading && !error && allExhibitions.length === 0" class="no-data">아직 등록된 전시 이력이 없습니다.</div>
      <ul v-else class="exhibitions-grid">
        <li v-for="exhibition in displayedExhibitions" :key="exhibition.id" class="exhibition-item">
          <div class="item-thumbnail">
            <img v-if="exhibition.image" :src="exhibition.image" :alt="exhibition.title + ' 포스터'" class="exhibition-poster">
          </div>
          <div class="item-details">
            <h3>{{ exhibition.title }}</h3>
            <p v-if="exhibition.date" class="item-date">{{ exhibition.date }}</p>
            <p v-if="exhibition.desc" class="item-description">{{ exhibition.desc }}</p>
          </div>
        </li>
      </ul>
      <button v-if="hasMoreExhibitions" @click="loadMoreExhibitions" class="load-more-btn">더보기</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const allExhibitions = ref([]);
const displayedCount = ref(6);
const loading = ref(true);
const error = ref(null);

const displayedExhibitions = computed(() => {
  return allExhibitions.value.slice(0, displayedCount.value);
});

const hasMoreExhibitions = computed(() => {
  return displayedCount.value < allExhibitions.value.length;
});

const loadMoreExhibitions = () => {
  displayedCount.value += 6;
};

onMounted(async () => {
  try {
    const response = await fetch('/data/exhibitions.json'); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    allExhibitions.value = data;
  } catch (err) {
    console.error("전시 이력 데이터를 가져오는 중 오류 발생:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
@use '../assets/styles/baseSection.scss';
@use '../assets/styles/_exhibitionHistory.scss';

.loading, .error, .no-data {
  font-size: 1.2em;
  color: #777;
  text-align: center;
  padding: 50px;
}
</style>