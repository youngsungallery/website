<!-- FILE: src/pages/HomePage.vue -->
<template>
  <section class="home">
    <section class="hero">
      <div class="hero-inner">
        <!-- 전시 메인 포스터 (현 전시만) -->
        <div class="hero-poster">
          <img
            v-if="heroExhibition?.imageUrl"
            class="poster-img"
            :src="heroExhibition.imageUrl"
            :alt="heroExhibition.title || 'Exhibition poster'"
            loading="eager"
            decoding="async"
            referrerpolicy="no-referrer"
          />
          <div v-else class="poster-placeholder">MAIN EXHIBITION POSTER</div>
        </div>

        <!-- 메타 카드 -->
        <div class="hero-meta">
          <div class="meta-card">
            <h2 class="ex-title">
              {{ heroExhibition?.title || "현재 전시 제목" }}
            </h2>

            <!-- 전시는 날짜만 -->
            <p class="ex-period">
              {{ heroPeriod || "—" }}
            </p>

            <!-- ✅ 현 진행전시 타이머: 전시 마감 기준 -->
            <div v-if="currentTimer.active" class="timer-pill">
              <span class="timer-label">전시 마감까지</span>
              <span class="timer-time">{{ currentTimer.text }}</span>
            </div>

            <!-- 특강(현 전시 연결 특강) -->
            <div v-if="sortedLectures.length" class="lecture-card">
              <div class="lecture-head">
                <span class="lecture-kicker">관련 특강</span>
              </div>

              <ul class="lecture-list">
                <li v-for="l in sortedLectures" :key="l.id" class="lecture-item">
                  <div class="lecture-main">
                    <div class="lec-title">
                      {{ l.title || l.name || "특강" }}
                    </div>

                    <div class="lec-period">
                      {{ lectureDateTimeText(l) || "—" }}
                    </div>

                    <!-- ✅ 현 특강 타이머: 특강 시간 기준 -->
                    <div v-if="lectureTimerById[l.id]?.active" class="timer-mini">
                      <span class="timer-label">특강 시작까지</span>
                      <span class="timer-time">{{ lectureTimerById[l.id].text }}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div v-if="error" class="error">{{ error }}</div>

            <!-- ✅ 예정 전시 그룹 (포스터 없음 / 문구만) -->
            <div v-if="upcomingExhibitions.length" class="upcoming-card">
              <div class="upcoming-head">
                <span class="upcoming-kicker">예정 전시</span>
              </div>

              <ul class="upcoming-list">
                <li v-for="ex in upcomingExhibitions" :key="ex.id" class="upcoming-item">
                  <div class="upcoming-main">
                    <div class="upcoming-title">{{ ex.title || "(제목 없음)" }}</div>
                    <div class="upcoming-period">{{ upcomingPeriodText(ex) || "—" }}</div>

                    <!-- ✅ 예정 전시 타이머
                         - 예정 전시에 특강이 있으면: 가장 빠른 특강 시간 기준
                         - 없으면: 전시 시작 기준 -->
                    <div v-if="upcomingTimerByExId[ex.id]?.active" class="timer-mini">
                      <span class="timer-label">{{ upcomingTimerByExId[ex.id].label }}</span>
                      <span class="timer-time">{{ upcomingTimerByExId[ex.id].text }}</span>
                    </div>

                    <!-- ✅ 예정 전시의 특강(문구만) -->
                    <div v-if="upcomingLecturesByExId[ex.id]?.length" class="upcoming-lectures">
                      <div class="ul-kicker">관련 특강</div>
                      <ul class="ul-list">
                        <li
                          v-for="l in upcomingLecturesByExId[ex.id]"
                          :key="l.id"
                          class="ul-item"
                        >
                          <span class="ul-title">{{ l.title || l.name || "특강" }}</span>
                          <span class="ul-dot">·</span>
                          <span class="ul-dt">{{ lectureDateTimeText(l) || "—" }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- /예정 전시 -->
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * ✅ 타이머 유틸(모듈)
 * - 아래 파일은 이전에 추가했던 모듈 기준
 *   FILE: src/lib/timeCountdown.js
 */
import { toMs, endOfDayMs, formatDuration } from "@/lib/timeCountdown";

const exhibitions = ref([]);
const lectureMap = ref({}); // { [lectureId]: lectureDoc }
const error = ref("");

/** shared ticker (1초) */
const nowMs = ref(Date.now());
let tick = null;

onMounted(() => {
  tick = setInterval(() => {
    nowMs.value = Date.now();
  }, 1000);
});

onBeforeUnmount(() => {
  if (tick) clearInterval(tick);
  tick = null;
});

function toTime(v) {
  // (기존 함수 유지)
  if (!v) return null;
  if (typeof v === "object" && typeof v.toDate === "function") return v.toDate().getTime();
  if (v instanceof Date) return v.getTime();
  if (typeof v === "number") return v;
  const t = Date.parse(v);
  return Number.isFinite(t) ? t : null;
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

/* 전시: 날짜만 */
function formatKstYmd(v) {
  const t = toTime(v);
  if (t === null) return "";
  const d = new Date(t + 9 * 60 * 60 * 1000);
  return `${d.getUTCFullYear()}.${pad2(d.getUTCMonth() + 1)}.${pad2(d.getUTCDate())}`;
}

/* 특강: 날짜 + 시간 */
function formatKstYmdHm(v) {
  const t = toTime(v);
  if (t === null) return "";
  const d = new Date(t + 9 * 60 * 60 * 1000);
  return `${d.getUTCFullYear()}.${pad2(d.getUTCMonth() + 1)}.${pad2(d.getUTCDate())} ${pad2(
    d.getUTCHours()
  )}:${pad2(d.getUTCMinutes())}`;
}

function lectureDateTimeText(l) {
  return formatKstYmdHm(l?.dateTime);
}

function pickHero(list) {
  const clean = (list ?? [])
    .filter((x) => x && x.deleted !== true)
    .map((x) => ({
      ...x,
      _s: toTime(x.startDate),
      _u: toTime(x.updatedAt || x.createdAt) ?? -Infinity,
    }))
    .filter((x) => x._s !== null)
    .sort((a, b) => (b._s !== a._s ? b._s - a._s : b._u - a._u));

  if (!clean.length) return null;
  const top = clean[0]._s;
  const group = clean.filter((x) => x._s === top);
  return group.find((x) => x.imageUrl?.trim()) || group[0];
}

async function loadLatestExhibitions() {
  const q = query(collection(db, "exhibitions"), orderBy("startDate", "desc"), limit(50));
  const snap = await getDocs(q);
  exhibitions.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

async function loadLecturesByIds(ids) {
  if (!Array.isArray(ids) || !ids.length) return [];
  const res = await Promise.all(
    ids.map(async (id) => {
      const s = await getDoc(doc(db, "lectures", id));
      return s.exists() ? { id: s.id, ...s.data() } : null;
    })
  );
  return res.filter(Boolean);
}

/** ✅ 모든 참조 lectureIds를 한 번에 로드(중복 제거) */
async function loadAllReferencedLectures() {
  const hero = pickHero(exhibitions.value);
  const upcoming = upcomingExhibitions.value;

  const ids = new Set();

  if (hero?.lectureIds?.length) hero.lectureIds.filter(Boolean).forEach((x) => ids.add(String(x)));
  upcoming.forEach((ex) => {
    (ex?.lectureIds || []).filter(Boolean).forEach((x) => ids.add(String(x)));
  });

  if (ids.size === 0) {
    lectureMap.value = {};
    return;
  }

  const list = await loadLecturesByIds(Array.from(ids));
  const map = {};
  list.forEach((l) => {
    map[l.id] = l;
  });
  lectureMap.value = map;
}

onMounted(async () => {
  try {
    await loadLatestExhibitions();
    await loadAllReferencedLectures();
  } catch (e) {
    error.value = String(e);
  }
});

const heroExhibition = computed(() => pickHero(exhibitions.value));

const heroPeriod = computed(() => {
  const ex = heroExhibition.value;
  if (!ex) return "";
  const s = formatKstYmd(ex.startDate);
  const e = ex.endDate ? formatKstYmd(ex.endDate) : "상설";
  return s ? `${s} – ${e}` : "";
});

/** 현 전시 연결 특강 */
const heroLectures = computed(() => {
  const ex = heroExhibition.value;
  const ids = Array.isArray(ex?.lectureIds) ? ex.lectureIds.filter(Boolean) : [];
  const out = [];
  ids.forEach((id) => {
    const l = lectureMap.value?.[String(id)];
    if (l) out.push(l);
  });
  return out;
});

const sortedLectures = computed(() => {
  return (heroLectures.value ?? [])
    .map((x) => ({
      ...x,
      _t: toTime(x.dateTime) ?? -Infinity,
      _u: toTime(x.updatedAt || x.createdAt) ?? -Infinity,
    }))
    .sort((a, b) => (b._t !== a._t ? b._t - a._t : b._u - a._u))
    .slice(0, 2);
});

/** ✅ 예정 전시 목록 (문구만 / 포스터 없음) */
const upcomingExhibitions = computed(() => {
  const heroId = heroExhibition.value?.id;
  const n = nowMs.value;

  return (exhibitions.value ?? [])
    .filter((x) => x && x.id && x.deleted !== true)
    .filter((x) => x.id !== heroId) // 상단 현 전시는 제외
    .map((x) => ({
      ...x,
      _s: toMs(x.startDate) ?? -Infinity,
      _u: toMs(x.updatedAt || x.createdAt) ?? -Infinity,
    }))
    .filter((x) => x._s !== -Infinity && x._s > n) // startDate가 미래인 것만
    .sort((a, b) => (a._s !== b._s ? a._s - b._s : b._u - a._u)); // 가까운 예정부터
});

function upcomingPeriodText(ex) {
  const s = formatKstYmd(ex?.startDate);
  const e = ex?.endDate ? formatKstYmd(ex.endDate) : "상설";
  return s ? `${s} – ${e}` : "";
}

/** ✅ 예정 전시별 연결 특강(문구) */
const upcomingLecturesByExId = computed(() => {
  const map = {};
  upcomingExhibitions.value.forEach((ex) => {
    const ids = Array.isArray(ex?.lectureIds) ? ex.lectureIds.filter(Boolean) : [];
    const out = [];
    ids.forEach((id) => {
      const l = lectureMap.value?.[String(id)];
      if (l) out.push(l);
    });
    out.sort((a, b) => (toTime(a.dateTime) ?? 0) - (toTime(b.dateTime) ?? 0)); // 빠른 순
    map[ex.id] = out;
  });
  return map;
});

/** =========================
 *  ✅ 타이머 표시 로직
 *  - 0초(이하)면 active=false로 숨김
 * ========================= */

/** 현 진행전시 마감 타이머 */
const currentTimer = computed(() => {
  const ex = heroExhibition.value;
  if (!ex) return { active: false, text: "" };

  const target = ex?.endDate ? endOfDayMs(ex.endDate) : null;
  if (!Number.isFinite(target)) return { active: false, text: "" };

  const remain = target - nowMs.value;
  if (!(remain > 0)) return { active: false, text: "" };

  return { active: true, text: formatDuration(remain) };
});

/** 현 특강별 타이머 (리스트 2개만 쓰는 구조라 가벼움) */
const lectureTimerById = computed(() => {
  const out = {};
  (sortedLectures.value ?? []).forEach((l) => {
    const target = toMs(l?.dateTime);
    if (!Number.isFinite(target)) {
      out[l.id] = { active: false, text: "" };
      return;
    }
    const remain = target - nowMs.value;
    if (!(remain > 0)) {
      out[l.id] = { active: false, text: "" };
      return;
    }
    out[l.id] = { active: true, text: formatDuration(remain) };
  });
  return out;
});

/** 예정 전시별 타이머
 * - 예정 전시에 특강이 있으면: 가장 빠른 특강 dateTime 기준
 * - 없으면: 전시 startDate 기준
 */
const upcomingTimerByExId = computed(() => {
  const out = {};
  upcomingExhibitions.value.forEach((ex) => {
    const lecs = upcomingLecturesByExId.value?.[ex.id] || [];
    const nextLectureMs = lecs.length ? toMs(lecs[0]?.dateTime) : null;

    const target = Number.isFinite(nextLectureMs) ? nextLectureMs : toMs(ex?.startDate);
    const label = Number.isFinite(nextLectureMs) ? "특강 시작까지" : "전시 시작까지";

    if (!Number.isFinite(target)) {
      out[ex.id] = { active: false, text: "", label };
      return;
    }

    const remain = target - nowMs.value;
    if (!(remain > 0)) {
      out[ex.id] = { active: false, text: "", label };
      return;
    }

    out[ex.id] = { active: true, text: formatDuration(remain), label };
  });
  return out;
});
</script>

<style scoped>
.hero-inner {
  display: grid;
  grid-template-columns: 200px 1fr; /* ✅ 포스터 폭 고정 */
  gap: 28px;
}

.hero-poster {
  width: 200px; /* ✅ 포스터 폭 고정 */
  border-radius: 16px;
  overflow: hidden;
}

.poster-img {
  width: 100%;
  height: auto; /* ✅ 세로는 이미지 비율대로 자동 */
  display: block;
  object-fit: contain; /* ✅ 잘림 방지(높이 지정 없지만 안전장치) */
}

.meta-card {
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: #fff;
}

.ex-title {
  font-size: 22px;
  font-weight: 800;
}

.ex-period {
  font-size: 13px;
  color: #555;
}

/* ✅ 타이머 */
.timer-pill {
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  background: rgba(0, 0, 0, 0.03);
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
}
.timer-mini {
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 9px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  background: rgba(0, 0, 0, 0.02);
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
}
.timer-label {
  font-weight: 800;
  color: #111;
}
.timer-time {
  font-weight: 800;
  color: #111;
  font-variant-numeric: tabular-nums;
}

/* 특강 */
.lecture-card {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.lecture-head {
  margin-bottom: 10px;
}

.lecture-kicker {
  font-size: 12px;
  font-weight: 800;
}

/* ✅ 기본 블릿 제거 */
.lecture-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.lecture-item {
  list-style: none;
  padding: 12px;
  border-radius: 14px;
  background: #fafafa;
}

.lecture-item + .lecture-item {
  margin-top: 12px;
}

.lec-title {
  font-size: 15px;
  font-weight: 800;
}

.lec-period {
  font-size: 13px;
  color: #555;
  margin-top: 4px;
}

/* ✅ 예정 전시 */
.upcoming-card {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}
.upcoming-head {
  margin-bottom: 10px;
}
.upcoming-kicker {
  font-size: 12px;
  font-weight: 900;
}
.upcoming-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.upcoming-item {
  list-style: none;
  padding: 12px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.02);
}
.upcoming-item + .upcoming-item {
  margin-top: 12px;
}
.upcoming-title {
  font-size: 14px;
  font-weight: 900;
}
.upcoming-period {
  margin-top: 4px;
  font-size: 12px;
  color: #666;
}

.upcoming-lectures {
  margin-top: 10px;
}
.ul-kicker {
  font-size: 12px;
  font-weight: 900;
}
.ul-list {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  display: grid;
  gap: 6px;
}
.ul-item {
  list-style: none;
  font-size: 12px;
  color: #555;
}
.ul-title {
  font-weight: 800;
  color: #111;
}
.ul-dot {
  margin: 0 6px;
  color: #999;
}

.error {
  font-size: 12px;
  color: #b00020;
}
</style>
