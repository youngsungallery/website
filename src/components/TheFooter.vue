<template>
  <footer class="app-footer">
    <hr class="footer-divider"> <!-- 첫 번째 구분선 (Copyright 위에) -->
    <div class="footer-section">
      <p>Copyright © 2025 Youngsun Gallery</p>
      <!-- ⭐ 이 부분은 그대로! ⭐ -->
      <p class="server-time">현재 서버 시각: {{ formattedServerTime }}</p>
    </div>
    <div class="footer-section tech-stack">
      <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
        <img src="/vite.svg" class="icon" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
        <img src="/vue.svg" class="icon" alt="Vue logo" />
      </a>
      <span>Powered by Vite & Vue</span>
    </div>
    <hr class="footer-divider"> <!-- 구분선 -->
    <div class="footer-section contact-info">
      <p>
        <a href="https://naver.me/xzlgF1UM" target="_blank" rel="noopener noreferrer">
          경기 수원시 영통구 덕영대로 1471번길 2층
          <span class="icon">🗺️</span> <!-- 지도 아이콘 -->
        </a>
      </p>
      <p>
        <a href="tel:031-203-1089">
          031-203-1089
          <span class="icon">📞</span> <!-- 전화 아이콘 -->
        </a>
      </p>
    </div>
    <hr class="footer-divider"> <!-- 구분선 -->
    <div class="footer-section social-links">
      <a href="https://www.youtube.com/@%EC%98%81%EC%84%A0%EA%B0%A4%EB%9F%AC%EB%A6%AC" target="_blank" rel="noopener noreferrer">
        <!-- 유튜브 아이콘 적용 -->
        <img src="/youtube.png" class="icon" alt="YouTube icon" /> 영선갤러리 유튜브
      </a>
      <a href="https://open.kakao.com/o/gNPhwidf" target="_blank" rel="noopener noreferrer">
        <!-- 카카오톡 아이콘 적용 -->
        <img src="/kakaotalk.png" class="icon" alt="KakaoTalk icon" /> 영선갤러리 카카오톡
      </a>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useTimeStore } from '@/stores/timeStore'; // timeStore 임포트

const timeStore = useTimeStore();
// ⭐⭐⭐ 수정 포인트 1: localNow는 매초마다 클라이언트의 현재 시간을 정확히 반영합니다. ⭐⭐⭐
const localNow = ref(new Date()); 

let timerId;

// 마운트 시 초 단위 타이머 시작
onMounted(() => {
  // ⭐⭐⭐ 수정 포인트 2: 매초마다 localNow 값을 업데이트합니다. ⭐⭐⭐
  timerId = setInterval(() => {
    localNow.value = new Date(); 
  }, 1000);
});

// 언마운트 시 타이머 정리
onUnmounted(() => {
  if (timerId) { // timerId가 유효한 경우에만 clearInterval 호출
    clearInterval(timerId);
  }
});

// ⭐⭐⭐ 수정 포인트 3: formattedServerTime computed 속성을 수정합니다. ⭐⭐⭐
// timeStore.timeOffset과 매초마다 업데이트되는 localNow를 결합하여 실제 흐르는 서버 시각을 만듭니다.
const formattedServerTime = computed(() => {
  // 클라이언트의 로컬 시간 (localNow.value)에 시간 오프셋 (timeStore.timeOffset)을 더합니다.
  const synchronizedTimeMs = localNow.value.getTime() + timeStore.timeOffset;
  const synchronizedDate = new Date(synchronizedTimeMs);

  return synchronizedDate.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // 24시간 형식
  });
});
</script>

<style scoped lang="scss">
@use '@/styles/TheFooter.scss';
</style>