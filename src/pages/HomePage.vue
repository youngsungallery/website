<!-- src/pages/HomePage.vue -->
<template>
  <section class="home">
    <section class="hero">
      <div class="hero-inner">
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

        <div class="hero-meta">
          <h2 class="title">{{ heroExhibition?.title || "현재 전시 제목" }}</h2>
          <p class="period">{{ heroPeriod || "—" }}</p>
          <p class="desc">
            {{ heroExhibition?.cardName || heroExhibition?.artistName || "전시 간단 설명 또는 큐레이션 문구" }}
          </p>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const exhibitionsJson = ref(null);

function toTime(iso) {
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : null;
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatKstYmd(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  // KST 고정 (UTC+9)로 YYYY.MM.DD
  const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return `${kst.getUTCFullYear()}.${pad2(kst.getUTCMonth() + 1)}.${pad2(kst.getUTCDate())}`;
}

/**
 * ✅ "전시 시작 날짜(startDate) 기준 최신"
 * - deleted 제외
 * - startDate 없는 항목 제외
 * - startDate가 가장 최근(가장 큰 시간값)인 전시를 hero로 선택
 * - 동률이면(updatedAt/createdAt) 최신을 보조 기준으로 정렬
 * - 포스터(imageUrl) 있는 전시를 우선 선택 (최신 그룹 안에서)
 */
function pickHero(list) {
  const clean = (list ?? [])
    .filter((x) => x && x.deleted !== true)
    .map((x) => {
      const s = toTime(x.startDate);
      const u = toTime(x.updatedAt || x.createdAt);
      return { ...x, _s: s, _u: u ?? -Infinity };
    })
    .filter((x) => x._s !== null);

  // startDate 최신 → (보조) updatedAt 최신
  clean.sort((a, b) => {
    const ds = (b._s ?? -Infinity) - (a._s ?? -Infinity);
    if (ds !== 0) return ds;
    return (b._u ?? -Infinity) - (a._u ?? -Infinity);
  });

  if (!clean.length) return null;

  // ✅ "가장 최신 startDate" 그룹 안에서 포스터 있는 걸 우선
  const topStart = clean[0]._s;
  const topGroup = clean.filter((x) => x._s === topStart);

  const withPoster = topGroup.find((x) => x.imageUrl && String(x.imageUrl).trim() !== "");
  return withPoster || topGroup[0];
}

onMounted(async () => {
  const res = await fetch("/data/exhibitions.json", { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load exhibitions.json: ${res.status}`);
  exhibitionsJson.value = await res.json();
});

const heroExhibition = computed(() => {
  const list = exhibitionsJson.value?.data?.exhibitions ?? [];
  return pickHero(list);
});

const heroPeriod = computed(() => {
  const ex = heroExhibition.value;
  if (!ex) return "";
  const s = formatKstYmd(ex.startDate);
  const e = ex.endDate ? formatKstYmd(ex.endDate) : "상설";
  return `${s} – ${e}`;
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 40px;
  align-items: center;
}

.poster-img {
  width: 100%;
  aspect-ratio: 3 / 4;
  display: block;
  object-fit: cover;
  background: #f2f2f2;
}

.poster-placeholder {
  width: 100%;
  aspect-ratio: 3 / 4;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 13px;
  letter-spacing: 0.1em;
}

.hero-meta .title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
}

.hero-meta .period {
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
}

.hero-meta .desc {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}
</style>
