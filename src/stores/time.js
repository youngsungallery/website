// src/stores/time.js

import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// firebaseConfig.js에서 export 한 db 인스턴스를 가져옵니다.
import { db } from '@/firebaseConfig';

// Realtime Database 관련 SDK 모듈은 파일 최상단에서 import 합니다.
import { ref as dbRef, onValue } from 'firebase/database';


export const useTimeStore = defineStore('time', () => {
  const serverTimeOffset = ref(0); // Firebase에서 가져올 시간 오프셋 (밀리초)
  const localNow = ref(new Date()); // 클라이언트 로컬 시간

  // 이 함수는 매초마다 localNow를 업데이트 합니다.
  let intervalId = null;
  function startLocalTimeUpdate() {
    if (!intervalId) {
      intervalId = setInterval(() => {
        localNow.value = new Date();
      }, 1000);
    }
  }

  // 이 함수를 통해 Firebase에서 서버 시간 오프셋을 가져옵니다.
  function initializeFirebaseTimeOffset() {
    if (!db) {
      console.error("Firebase Realtime Database 인스턴스를 찾을 수 없습니다. db 객체 import 경로를 확인하세요.");
      return;
    }

    const offsetRef = dbRef(db, '.info/serverTimeOffset');
    onValue(offsetRef, (snapshot) => {
      // snapshot.val()에 Firebase 서버와 클라이언트 간의 시간 오프셋(밀리초)이 들어있습니다.
      serverTimeOffset.value = snapshot.val() || 0; // 값이 없으면 0으로 초기화
      // console.log(`Firebase serverTimeOffset 업데이트됨: ${serverTimeOffset.value} ms`); // ⭐⭐ 제거 ⭐⭐
    });
  }

  // Computed 속성: 클라이언트 로컬 시간에 오프셋을 더해서 보정된 "서버 시간"을 계산합니다.
  const correctedServerTime = computed(() => {
    const currentLocalTime = localNow.value.getTime(); // localNow의 타임스탬프를 가져옴
    const currentServerTimeOffset = serverTimeOffset.value; // serverTimeOffset의 값을 가져옴

    const timestamp = currentLocalTime + currentServerTimeOffset;
    const dateObject = new Date(timestamp);
    return dateObject;
  });

  // Pinia 스토어가 생성될 때 초기화 함수들을 호출합니다.
  startLocalTimeUpdate();
  initializeFirebaseTimeOffset();

  return {
    localNow,
    serverTimeOffset,
    correctedServerTime,
    startLocalTimeUpdate,
    initializeFirebaseTimeOffset,
  };
});