<template>
  <section id="lecture-history" class="section">
    <h2>특강 이력</h2>
    <p>지난 특강 기록들을 여기에 표시할 예정입니다.</p>

    <!-- 특강 이력 데이터를 표시할 공간 -->
    <div class="lecture-list">
      <div v-if="loading" class="loading">특강 이력을 불러오는 중입니다...</div>
      <div v-else-if="error" class="error">특강 이력을 불러오는데 오류가 발생했습니다: {{ error }}</div>
      <div v-else-if="lectures.length === 0" class="no-data">아직 등록된 특강 이력이 없습니다.</div>
      <ul v-else class="lectures-grid">
        <li v-for="lecture in lectures" :key="lecture.id" class="lecture-item">
          <h3>{{ lecture.title }}</h3>
          <p v-if="lecture.instructor">강사: {{ lecture.instructor }}</p>
          <p v-if="lecture.date">{{ lecture.date }}</p>
          <img v-if="lecture.poster" :src="lecture.poster" :alt="lecture.title + ' 포스터'" class="lecture-poster">
          <!-- 더 자세한 정보가 있다면 여기에 추가할 수 있어 -->
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // ref와 onMounted 훅 import
// @use '../assets/styles/baseSection.scss'; // ✨ 이 줄은 스크립트 안에 있으면 안 돼! ✨

const lectures = ref([]); // 특강 이력 데이터를 저장할 반응형 변수
const loading = ref(true);    // 로딩 상태
const error = ref(null);      // 에러 메시지

onMounted(async () => {
  try {
    // public 폴더의 data 폴더에 있는 JSON 파일을 가져오는 경로
    const response = await fetch('/data/lectures.json'); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    lectures.value = data; // 가져온 데이터를 lectures 반응형 변수에 할당
  } catch (err) {
    console.error("특강 이력 데이터를 가져오는 중 오류 발생:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
@use '../assets/styles/baseSection.scss'; // ✨ baseSection 스타일 불러오기 ✨

#lecture-history {
  background-color: #f0f0ff; // ExhibitionHistory와 다른 색상으로 구분
  min-height: 100vh;
  padding-top: 100px; /* 헤더 겹침 방지 + 상단 여백 */
  padding-bottom: 50px;
}

.lecture-list {
  margin-top: 40px;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.lectures-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* 반응형 그리드 */
  gap: 30px;
  text-align: left;
}

.lecture-item {
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

  .lecture-poster {
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