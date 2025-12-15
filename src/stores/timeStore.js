import { defineStore } from 'pinia';
import { calculateTimeOffset } from '@/services/timeService'; // 우리가 만든 timeService 임포트

export const useTimeStore = defineStore('time', {
  state: () => ({
    timeOffset: 0, // 클라이언트 시간과 서버 시간 간의 오프셋 (밀리초 단위)
    lastSyncTime: null, // 마지막으로 서버 시간을 동기화한 시점 (Date 객체)
  }),
  getters: {
    // 서버 시간을 반영한 현재 시각을 반환하는 게터
    serverCurrentTime: (state) => {
      // Pinia가 초기화되기 전 또는 offset이 없는 경우를 대비
      if (state.timeOffset === null) {
        return new Date(); // 로컬 시간 반환
      }
      return new Date(new Date().getTime() + state.timeOffset);
    },
  },
  actions: {
    // World Time API를 호출하여 timeOffset을 업데이트합니다.
    async updateTimeOffset() {
      try {
        const offset = await calculateTimeOffset();
        if (typeof offset === 'number') { // offset이 유효한 숫자인지 확인
          this.timeOffset = offset;
          this.lastSyncTime = new Date();
          console.log(`[TimeStore] 시간 오프셋 업데이트 완료: ${offset}ms`);
        } else {
          console.warn("[TimeStore] timeService에서 유효한 오프셋을 받지 못했습니다. 기존 값 유지.");
        }
      } catch (error) {
        console.error("[TimeStore] 시간 오프셋 업데이트 중 오류 발생:", error);
        // 오류 발생 시 기존 오프셋을 유지하거나 기본값 0으로 설정할 수 있습니다.
        // this.timeOffset = 0;
      }
    },
  },
});