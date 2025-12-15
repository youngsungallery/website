/**
 * World Time API로부터 현재 서버 시각을 가져오는 서비스 모듈입니다.
 */

// World Time API의 서울 시간대 엔드포인트 URL
const WORLD_TIME_API_URL = "https://worldtimeapi.org/api/timezone/Asia/Seoul";

/**
 * World Time API를 호출하여 현재 서버 시각(UTC datetime)을 가져옵니다.
 * @returns {Promise<Date|null>} World Time API에서 가져온 Date 객체 또는 오류 발생 시 null
 */
export async function fetchServerTime() {
  try {
    const response = await fetch(WORLD_TIME_API_URL); // API 호출
    if (!response.ok) {
      console.error(`Error fetching World Time API: ${response.status}`);
      return null;
    }
    const data = await response.json(); // 응답을 JSON 형태로 파싱

    // JSON 데이터에서 datetime 필드를 추출하고 Date 객체로 변환합니다.
    // 예시: "2025-12-15T11:50:08.123456+09:00"
    if (data && data.datetime) {
      // ISO 8601 형식의 문자열을 Date 객체로 바로 변환 가능
      const serverTime = new Date(data.datetime);
      console.log("World Time API로부터 서버 시간 수신:", serverTime);
      return serverTime;
    } else {
      console.error("World Time API 응답에서 datetime 필드를 찾을 수 없습니다.", data);
      return null;
    }
  } catch (error) {
    console.error("World Time API 호출 중 네트워크 또는 파싱 오류 발생:", error);
    return null;
  }
}

/**
 * 클라이언트의 현재 시각과 서버 시각(World Time API) 간의 오프셋(밀리초)을 계산합니다.
 * 이 오프셋을 클라이언트 로컬 시간에 더하면 서버 시간과 동기화됩니다.
 * @returns {Promise<number>} 서버 시간 - 클라이언트 시간 (밀리초 단위)
 */
export async function calculateTimeOffset() {
  const clientTimeBefore = new Date().getTime(); // API 호출 직전 클라이언트 시간
  const serverTime = await fetchServerTime(); // 서버 시간 가져오기
  const clientTimeAfter = new Date().getTime(); // API 호출 직후 클라이언트 시간

  if (serverTime) {
    // API 호출에 걸린 네트워크 지연 시간을 고려하여 오프셋을 보정합니다.
    // 대략적인 왕복 시간의 절반을 서버 시간에 더해줍니다.
    const networkLatency = (clientTimeAfter - clientTimeBefore) / 2;
    const estimatedServerTime = serverTime.getTime() + networkLatency;
    const offset = estimatedServerTime - clientTimeAfter; // 보정된 서버 시간 - 현재 클라이언트 시간
    console.log("시간 오프셋 계산 완료 (밀리초):", offset);
    return offset;
  } else {
    console.warn("서버 시간을 가져올 수 없어 시간 오프셋을 계산할 수 없습니다. 오프셋: 0");
    return 0; // 서버 시간 가져오기 실패 시 오프셋을 0으로 처리 (오차 보정 없음)
  }
}