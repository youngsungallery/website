<template>
  <div id="app-container">
    <router-view /> <!-- 라우터에 따라 메인 레이아웃 또는 관리자 레이아웃이 렌더링됩니다. -->
  </div>
</template>

<script setup>
// nextTick은 현재 코드에서는 사용되지 않으므로 제거할 수 있습니다.
import { onMounted, onUnmounted } from 'vue'; 
import { useTimeStore } from '@/stores/time'; // useTimeStore 임포트

import '@/styles/AppLayout.scss'; // 전역 스타일만 유지

const timeStore = useTimeStore(); // 스토어를 가져오는 것만으로 Firebase 리스너가 자동 시작됩니다.

// ⭐⭐⭐ 이전의 시간 동기화 관련 모든 로직은 이제 필요 없습니다. ⭐⭐⭐
// Firebase Pinia 스토어(time.js)에서 모든 초기화 및 실시간 업데이트를 처리하기 때문입니다.

// 이전 변수들은 모두 삭제합니다.
// let hourlySyncIntervalId;
// let firstSyncTimeout;

onMounted(() => {
  // Pinia 스토어를 useTimeStore()로 가져오는 순간 이미 Firebase 리스너가 시작됩니다.
  // 추가적인 nextTick()이나 await timeStore.updateTimeOffset() 호출은 필요 없습니다.
  console.log("[App.vue] 앱 시작 완료. Firebase 시간 동기화는 스토어에서 자동으로 처리됩니다.");
});

onUnmounted(() => {
  // Firebase 리스너는 앱이 종료될 때 자동으로 정리될 것이며,
  // setInterval/setTimeout 변수가 없으므로 클리어할 것도 없습니다.
  // console.log("[App.vue] App 컴포넌트 언마운트.");
});
</script>

<style scoped>
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* router-view-wrapper는 App.vue에서 직접 사용하지 않으므로 제거하거나 주석 처리 */
/*
.router-view-wrapper {
  flex-grow: 1;
}
*/
</style>