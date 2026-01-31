// FILE: src/lib/timeCountdown.js
import { ref, computed, onBeforeUnmount } from "vue";

/**
 * Firestore Timestamp / Date / number(ms) / string 을 ms로 변환
 */
export function toMs(v) {
  if (!v) return null;
  if (typeof v === "object" && typeof v.toDate === "function") return v.toDate().getTime(); // Firestore Timestamp
  if (v instanceof Date) return v.getTime();
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  const t = Date.parse(v);
  return Number.isFinite(t) ? t : null;
}

/**
 * "날짜만" (전시 startDate/endDate 같은) Timestamp를
 * 그 날짜의 끝(23:59:59.999) ms로 확장
 * - admin에서 date -> Timestamp를 만들 때(00:00 기준) 저장하므로,
 *   endDate는 + 1day - 1ms 로 처리하면 보통 의도한 "해당 일 포함"이 됨.
 */
export function endOfDayMs(dateOnlyValue) {
  const ms = toMs(dateOnlyValue);
  if (ms === null) return null;
  return ms + (24 * 60 * 60 * 1000) - 1;
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

export function formatDuration(ms) {
  if (!Number.isFinite(ms) || ms <= 0) return "00:00:00";

  const totalSec = Math.floor(ms / 1000);
  const s = totalSec % 60;
  const totalMin = Math.floor(totalSec / 60);
  const m = totalMin % 60;
  const totalHr = Math.floor(totalMin / 60);
  const h = totalHr % 24;
  const d = Math.floor(totalHr / 24);

  if (d > 0) return `${d}일 ${pad2(h)}:${pad2(m)}:${pad2(s)}`;
  return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
}

/**
 * 공용 카운트다운 composable
 * - 1초 틱
 * - 0초(이하) 되면 inactive로 바뀌고 (원하면) 자동 숨김 처리 가능
 */
export function useCountdown(targetMsOrAny, opts = {}) {
  const {
    intervalMs = 1000,
    hideWhenDone = true,
    nowFn = () => Date.now(),
  } = opts;

  const now = ref(nowFn());
  let timer = null;

  const targetMs = computed(() => {
    const v = typeof targetMsOrAny === "function" ? targetMsOrAny() : targetMsOrAny;
    return toMs(v);
  });

  const remainingMs = computed(() => {
    const t = targetMs.value;
    if (t === null) return null;
    return t - now.value;
  });

  const isDone = computed(() => {
    const r = remainingMs.value;
    if (r === null) return true;
    return r <= 0;
  });

  const isActive = computed(() => {
    if (targetMs.value === null) return false;
    if (!hideWhenDone) return true;
    return !isDone.value;
  });

  const text = computed(() => {
    const r = remainingMs.value;
    if (r === null) return "";
    return formatDuration(r);
  });

  function start() {
    stop();
    now.value = nowFn();
    timer = setInterval(() => {
      now.value = nowFn();
      if (hideWhenDone && isDone.value) stop(); // 0초 되면 멈춤
    }, intervalMs);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  start();
  onBeforeUnmount(stop);

  return {
    targetMs,
    now,
    remainingMs,
    isDone,
    isActive,
    text,
    start,
    stop,
  };
}

/**
 * 전시 타이머 전용: "시작까지" / "마감까지" 자동 판단
 * - startDate: 날짜만
 * - endDate: 날짜만 (endOfDay로 확장해서 "해당 일 포함" 처리)
 */
export function useExhibitionCountdown(startDate, endDate, opts = {}) {
  const startMs = computed(() => toMs(typeof startDate === "function" ? startDate() : startDate));
  const endMs = computed(() => endOfDayMs(typeof endDate === "function" ? endDate() : endDate));
  const nowFn = opts.nowFn || (() => Date.now());

  const phase = computed(() => {
    const s = startMs.value;
    const e = endMs.value;
    const n = nowFn();

    if (s === null && e === null) return "none";
    if (s !== null && n < s) return "before";         // 시작 전
    if (e !== null && n <= e) return "running";       // 진행 중
    return "after";                                    // 종료
  });

  const label = computed(() => {
    if (phase.value === "before") return "전시 시작까지";
    if (phase.value === "running") return "전시 마감까지";
    return "";
  });

  // phase에 따라 target 바뀜
  const target = computed(() => {
    if (phase.value === "before") return startMs.value;
    if (phase.value === "running") return endMs.value;
    return null;
  });

  const cd = useCountdown(() => target.value, { ...opts, hideWhenDone: true });

  // 종료(after)면 숨김
  const isActive = computed(() => phase.value !== "after" && cd.isActive.value);

  return {
    phase,
    label,
    ...cd,
    isActive,
  };
}

/**
 * 특강 타이머 전용: "특강 시작까지"
 * - dateTime: 정확한 Timestamp (날짜+시간)
 */
export function useLectureCountdown(dateTime, opts = {}) {
  const label = "특강 시작까지";
  const cd = useCountdown(dateTime, { ...opts, hideWhenDone: true });

  return {
    label,
    ...cd,
  };
}
