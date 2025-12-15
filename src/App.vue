<template>
  <div id="app-container">
    <MainHeader />
    <router-view />
    <TheFooter />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import { useTimeStore } from '@/stores/timeStore';     // 이건 이미 '@/stores' 별칭 사용 중
// ⭐⭐⭐ 아래 두 임포트 경로를 './' 대신 '@/''으로 수정합니다! ⭐⭐⭐
import TheHeader from '@/components/MainHeader.vue';    // TheHeader 임포트 경로 수정!
import TheFooter from '@/components/TheFooter.vue';    // TheFooter 임포트 경로 수정!

import '@/styles/AppLayout.scss'; // 이건 전역 스타일이라 상관 없음

const timeStore = useTimeStore();
let hourlySyncIntervalId;

onMounted(async () => {
  await nextTick();

  console.log("[App.vue] 앱 시작 시 초기 시간 동기화 시작.");
  await timeStore.updateTimeOffset();

  const now = new Date();
  const minutesToNextHour = 60 - now.getMinutes();
  const secondsToNextHour = 60 - now.getSeconds();
  const millisecondsToNextHour = (minutesToNextHour * 60 + secondsToNextHour) * 1000;

  console.log(`[App.vue] 다음 정각까지 ${minutesToNextHour}분 ${secondsToNextHour}초 남았습니다. ${millisecondsToNextHour}ms 후에 첫 정각 동기화.`);

  const firstSyncTimeout = setTimeout(async () => {
    console.log("[App.vue] 첫 정각 동기화 실행!");
    await timeStore.updateTimeOffset();
    
    hourlySyncIntervalId = setInterval(async () => {
      console.log("[App.vue] 매시 정각 주기적 동기화 실행!");
      await timeStore.updateTimeOffset();
    }, 3600000);
  }, millisecondsToNextHour);

  onUnmounted(() => {
    if (firstSyncTimeout) {
      clearTimeout(firstSyncTimeout);
    }
    if (hourlySyncIntervalId) {
      clearInterval(hourlySyncIntervalId);
      console.log("[App.vue] 매시 정각 동기화 인터벌 클리어.");
    }
  });

});
</script>

<style scoped>
/* App.vue에 직접적인 스타일은 거의 없습니다. */
/* AppLayout.scss에서 전역 스타일을 관리합니다. */
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.router-view-wrapper {
  flex-grow: 1;
}
</style>