// src/composables/useServerTime.js - 서버 시간 동기화 로직을 제공하는 Composable

import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useTimeStore } from '@/stores/time';
import { storeToRefs } from 'pinia'; // Pinia의 storeToRefs를 import 합니다!

/**
 * 서버 시간을 동기화하고, 초 단위로 흐르는 보정된 현재 시간을 반환하는 Composable.
 * 이 Composable은 컴포넌트 내부에서 호출되어야 합니다 (onMounted, onUnmounted 훅 사용).
 *
 * @returns {{ formattedServerTime: ComputedRef<string> }} formattedServerTime - 서버 시각으로 보정된 현재 시간을 포맷된 문자열로 반환
 */
export function useServerTime() {
  const timeStore = useTimeStore();
  const { serverTimeOffset } = storeToRefs(timeStore); 

  // 이 Composable에서 별도로 관리하는 localNow (매초 업데이트)
  const localNowInComposable = ref(new Date()); 
  let timerId;

  onMounted(() => {
    timerId = setInterval(() => {
      localNowInComposable.value = new Date();
    }, 1000);
  });

  onUnmounted(() => {
    if (timerId) {
      clearInterval(timerId);
    }
  });

  // formattedServerTime computed 속성: timeStore.serverTimeOffset과 Composable의 localNow를 결합합니다.
  const formattedServerTime = computed(() => {
    const currentLocalNow = localNowInComposable.value; // Composable 내의 localNow
    const currentStoreServerTimeOffset = serverTimeOffset.value; // Pinia 스토어의 Firebase 오프셋

    // synchronizedTimeMs 계산: currentStoreServerTimeOffset이 유효하지 않을 경우를 대비하여 0으로 폴백
    const synchronizedTimeMs = currentLocalNow.getTime() + (currentStoreServerTimeOffset || 0);
    const synchronizedDate = new Date(synchronizedTimeMs);
    
    // 최종 유효성 검사 및 포맷팅
    if (synchronizedDate && !isNaN(synchronizedDate.getTime())) {
      return synchronizedDate.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // 24시간 형식
      });
    }
    // 시간이 유효하지 않을 경우 표시할 텍스트
    return '시간 로딩 중...'; 
  });

  return {
    formattedServerTime,
  };
}