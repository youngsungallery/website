// 필요한 Firebase Functions 및 Admin SDK를 불러옵니다.
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Firebase Admin SDK를 초기화합니다.
admin.initializeApp();

// Realtime Database 인스턴스를 가져옵니다.
const db = admin.database();

// 정각마다 Realtime Database에 현재 서버 시간을 업데이트하는 Function을 스케줄링합니다.
// Cron 스케줄 형식: '0 * * * *' 는 매 시 0분마다 (정각마다) 실행하라는 의미입니다.
// 타임존은 'Asia/Seoul'로 설정하여 한국 시간 기준으로 정각을 맞춥니다.
exports.hourlyTimeSync = functions.pubsub
    .schedule("0 * * * *")
    .timeZone("Asia/Seoul") // 한국 시간 기준 정각
    .onRun(async (context) => {
      try {
        // Realtime Database의 /serverClock/lastHourlySyncTimestamp 노드에
        // Firebase 서버의 현재 Unix 타임스탬프를 업데이트합니다.
        // ServerValue.TIMESTAMP는 Firebase 서버 시간을 사용하므로
        // 클라이언트 시간 오류를 방지합니다.
        await db.ref("/serverClock/lastHourlySyncTimestamp")
            .set(admin.database.ServerValue.TIMESTAMP);
        console.log("Realtime Database에 정각 시간 동기화 완료!");
        return null; // 성공적으로 완료되었음을 알립니다.
      } catch (error) {
        console.error("Realtime Database 정각 시간 동기화 중 오류 발생:", error);
        return null; // 에러가 발생해도 함수는 종료됩니다.
      }
    });
