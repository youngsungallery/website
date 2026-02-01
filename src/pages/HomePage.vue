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

            <!-- ✅ 현 진행전시 타이머: 전시 마감 기준 (KST 날짜 경계) -->
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

            <!-- ✅ 구분선 + 예정 전시 헤더는 항상 표시 -->
            <div class="section-divider"></div>

            <div class="upcoming-head">
              <span class="upcoming-kicker">예정 전시</span>
              <span class="upcoming-sub">(KST 기준)</span>
            </div>

            <!-- ✅ 예정 전시 목록 (포스터 없음 / 문구만) -->
            <ul v-if="upcomingExhibitions.length" class="upcoming-list">
              <li v-for="ex in upcomingExhibitions" :key="ex.id" class="upcoming-item">
                <div class="upcoming-main">
                  <div class="upcoming-title">{{ ex.title || "(제목 없음)" }}</div>
                  <div class="upcoming-period">{{ upcomingPeriodText(ex) || "—" }}</div>

                  <!-- ✅ 예정 전시 타이머: 전시 시작 기준 (KST 날짜 경계) -->
                  <div v-if="upcomingExTimerByExId[ex.id]?.active" class="timer-mini">
                    <span class="timer-label">전시 시작까지</span>
                    <span class="timer-time">{{ upcomingExTimerByExId[ex.id].text }}</span>
                  </div>

                  <!-- ✅ 예정 전시의 특강(문구만 + 각 특강별 타이머) -->
                  <div v-if="upcomingLecturesByExId[ex.id]?.length" class="upcoming-lectures">
                    <div class="ul-kicker">관련 특강</div>

                    <ul class="ul-list">
                      <li v-for="l in upcomingLecturesByExId[ex.id]" :key="l.id" class="ul-item">
                        <div class="ul-row">
                          <div class="ul-text">
                            <span class="ul-title">{{ l.title || l.name || "특강" }}</span>
                            <span class="ul-dot">·</span>
                            <span class="ul-dt">{{ lectureDateTimeText(l) || "—" }}</span>
                          </div>

                          <!-- ✅ 예정 특강 타이머: 각 특강 dateTime 기준 -->
                          <div v-if="upcomingLectureTimerById[l.id]?.active" class="timer-mini">
                            <span class="timer-label">특강 시작까지</span>
                            <span class="timer-time">{{ upcomingLectureTimerById[l.id].text }}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>

            <div v-else class="upcoming-empty">예정 전시가 없습니다.</div>
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
 * FILE: src/lib/timeCountdown.js
 */
import { toMs, formatDuration } from "@/lib/timeCountdown";

const exhibitions = ref([]);
const lectureMap = ref({});
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

/** ✅ KST 날짜 경계 고정(핵심 수정)
 * - Firestore Timestamp가 어떤 timezone/00:00로 들어와도
 *   "KST의 그 날짜" 기준으로 00:00 / 23:59:59.999를 만들어줌
 */
const KST_OFFSET = 9 * 60 * 60 * 1000;

function kstYmdFromAny(v) {
  const ms = toMs(v);
  if (!Number.isFinite(ms)) return null;
  const d = new Date(ms + KST_OFFSET); // KST로 이동
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), day: d.getUTCDate() };
}

function kstStartOfDayMs(v) {
  const ymd = kstYmdFromAny(v);
  if (!ymd) return null;
  return Date.UTC(ymd.y, ymd.m, ymd.day) - KST_OFFSET;
}

function kstEndOfDayMs(v) {
  const ymd = kstYmdFromAny(v);
  if (!ymd) return null;
  return Date.UTC(ymd.y, ymd.m, ymd.day + 1) - KST_OFFSET - 1;
}

/**
 * ✅ 메인(현 전시) 선택 규칙
 * - startDate가 현재보다 미래면 메인 제외
 * - startDate <= now 중 최신을 메인
 */
function pickCurrentHero(list, now) {
  const clean = (list ?? [])
    .filter((x) => x && x.deleted !== true)
    .map((x) => ({
      ...x,
      _s: toMs(x.startDate),
      _u: toMs(x.updatedAt || x.createdAt) ?? -Infinity,
    }))
    .filter((x) => Number.isFinite(x._s) && x._s <= now)
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

const heroExhibition = computed(() => pickCurrentHero(exhibitions.value, nowMs.value));

/** ✅ 예정 전시: startDate가 현재보다 미래면 무조건 예정 */
const upcomingExhibitions = computed(() => {
  const heroId = heroExhibition.value?.id;

  return (exhibitions.value ?? [])
    .filter((x) => x && x.id && x.deleted !== true)
    .filter((x) => x.id !== heroId)
    .map((x) => ({
      ...x,
      _s: toMs(x.startDate) ?? -Infinity,
      _u: toMs(x.updatedAt || x.createdAt) ?? -Infinity,
    }))
    .filter((x) => Number.isFinite(x._s) && x._s > nowMs.value)
    .sort((a, b) => (a._s !== b._s ? a._s - b._s : b._u - a._u));
});

/** ✅ 모든 참조 lectureIds 한 번에 로드(중복 제거) */
async function loadAllReferencedLectures() {
  const hero = heroExhibition.value;
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
  list.forEach((l) => (map[l.id] = l));
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
    out.sort((a, b) => (toTime(a.dateTime) ?? 0) - (toTime(b.dateTime) ?? 0));
    map[ex.id] = out;
  });
  return map;
});

/** =========================
 *  ✅ 타이머 (0초면 숨김)
 * ========================= */

/** 현 진행전시 마감 타이머: endDate를 KST '그 날짜의 끝'으로 */
const currentTimer = computed(() => {
  const ex = heroExhibition.value;
  if (!ex) return { active: false, text: "" };

  const target = ex?.endDate ? kstEndOfDayMs(ex.endDate) : null;
  if (!Number.isFinite(target)) return { active: false, text: "" };

  const remain = target - nowMs.value;
  if (!(remain > 0)) return { active: false, text: "" };

  return { active: true, text: formatDuration(remain) };
});

/** 현 특강별 타이머 (리스트 2개만) */
const lectureTimerById = computed(() => {
  const out = {};
  (sortedLectures.value ?? []).forEach((l) => {
    const target = toMs(l?.dateTime);
    if (!Number.isFinite(target)) return (out[l.id] = { active: false, text: "" });
    const remain = target - nowMs.value;
    if (!(remain > 0)) return (out[l.id] = { active: false, text: "" });
    out[l.id] = { active: true, text: formatDuration(remain) };
  });
  return out;
});

/** 예정 전시 타이머: startDate를 KST '그 날짜의 시작'으로 */
const upcomingExTimerByExId = computed(() => {
  const out = {};
  upcomingExhibitions.value.forEach((ex) => {
    const target = kstStartOfDayMs(ex?.startDate);
    if (!Number.isFinite(target)) return (out[ex.id] = { active: false, text: "" });
    const remain = target - nowMs.value;
    if (!(remain > 0)) return (out[ex.id] = { active: false, text: "" });
    out[ex.id] = { active: true, text: formatDuration(remain) };
  });
  return out;
});

/** 예정 특강 타이머: 각 특강별 dateTime 그대로 */
const upcomingLectureTimerById = computed(() => {
  const out = {};
  const map = upcomingLecturesByExId.value || {};
  Object.keys(map).forEach((exId) => {
    (map[exId] || []).forEach((l) => {
      const target = toMs(l?.dateTime);
      if (!Number.isFinite(target)) return (out[l.id] = { active: false, text: "" });
      const remain = target - nowMs.value;
      if (!(remain > 0)) return (out[l.id] = { active: false, text: "" });
      out[l.id] = { active: true, text: formatDuration(remain) };
    });
  });
  return out;
});
</script>

<style scoped>
.hero-inner {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 28px;
}

/* ✅ 모바일에서 세로로 (포스터 -> 문구) */
@media (max-width: 640px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .hero-poster {
    width: 100%;
  }
}

.hero-poster {
  width: 200px;
  border-radius: 16px;
  overflow: hidden;
}

.poster-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
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

/* 타이머 */
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

/* 특강(현 전시) */
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

/* 구분선 */
.section-divider {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid rgba(0, 0, 0, 0.10);
}

/* 예정 전시 */
.upcoming-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 10px;
}
.upcoming-kicker {
  font-size: 12px;
  font-weight: 900;
}
.upcoming-sub {
  font-size: 12px;
  color: #777;
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
.upcoming-empty {
  font-size: 12px;
  color: #777;
  padding: 8px 0 0;
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
  gap: 8px;
}
.ul-item {
  list-style: none;
}
.ul-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}
.ul-text {
  font-size: 12px;
  color: #555;
  min-width: 0;
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
