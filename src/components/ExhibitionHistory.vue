<template>
  <section id="exhibition-history" class="section">
    <h2>전시 이력</h2>
    <p>지난 전시 기록들을 여기에 표시할 예정입니다.</p>

    <div class="exhibition-list">
      <div v-if="loading" class="loading">전시 이력을 불러오는 중입니다...</div>
      <div v-else-if="error" class="error">전시 이력을 불러오는데 오류가 발생했습니다: {{ error }}</div>
      <div v-else-if="exhibitions.length === 0" class="no-data">아직 등록된 전시 이력이 없습니다.</div>
      <ul v-else class="exhibitions-grid">
        <li v-for="exhibition in exhibitions" :key="exhibition.id" class="exhibition-item">
          <h3>{{ exhibition.title }}</h3>
          <p v-if="exhibition.period">{{ exhibition.period }}</p>
          <img v-if="exhibition.poster" :src="exhibition.poster" :alt="exhibition.title + ' 포스터'" class="exhibition-poster">
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // ref와 onMounted 훅 import
// ✨ 이 줄을 삭제해야 해! (@use '../assets/styles/baseSection.scss';) ✨

const exhibitions = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('/data/exhibitions.json'); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    exhibitions.value = data;
  } catch (err) {
    console.error("전시 이력 데이터를 가져오는 중 오류 발생:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
@use '../assets/styles/baseSection.scss'; // ✨ @use는 반드시 여기에 있어야 해! ✨

#exhibition-history {
  background-color: #f9f9f9;
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 50px;
}

.exhibition-list {
  margin-top: 40px;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.exhibitions-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  text-align: left;
}

.exhibition-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.5em;
    color: #333;
    margin-top: 0;
    margin-bottom: 10px;
    line-height: 1.3;
  }

  p {
    font-size: 1em;
    color: #666;
    margin-bottom: 15px;
    line-height: 1.5;
  }

  .exhibition-poster {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin-top: auto;
  }
}

.loading, .error, .no-data {
  font-size: 1.2em;
  color: #777;
  text-align: center;
  padding: 50px;
}
</style>