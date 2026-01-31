<!-- FILE: src/pages/HomePage.vue -->
<template>
  <section class="home">
    <section class="hero">
      <div class="hero-inner">
        <!-- 전시 메인 포스터 -->
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

            <!-- 특강 -->
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
                  </div>
                </li>
              </ul>
            </div>

            <div v-if="error" class="error">{{ error }}</div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

const exhibitions = ref([]);
const lectures = ref([]);
const error = ref("");

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
  const q = query(collection(db, "exhibitions"), orderBy("startDate", "desc"), limit(20));
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

onMounted(async () => {
  try {
    await loadLatestExhibitions();
    const hero = pickHero(exhibitions.value);
    lectures.value = hero?.lectureIds?.length ? await loadLecturesByIds(hero.lectureIds) : [];
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

const sortedLectures = computed(() => {
  return (lectures.value ?? [])
    .map((x) => ({
      ...x,
      _t: toTime(x.dateTime) ?? -Infinity,
      _u: toTime(x.updatedAt || x.createdAt) ?? -Infinity,
    }))
    .sort((a, b) => (b._t !== a._t ? b._t - a._t : b._u - a._u))
    .slice(0, 2);
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

/* ✅ 여기서 기본 블릿(•) 제거 */
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

.error {
  font-size: 12px;
  color: #b00020;
}
</style>
