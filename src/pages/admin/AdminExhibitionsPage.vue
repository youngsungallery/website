<!-- FILE: src/components/admin/AdminExhibitionsPage.vue
  NOTE:
  - GitHub Pages에서는 fetch("/data/...") 같은 절대경로가 404를 만들 수 있음.
  - 반드시 import.meta.env.BASE_URL 기준으로 public/data/exhibitions.json 을 로드해야 함.
-->

<template>
  <section class="admin-page">
    <header class="page-head">
      <div class="head-top">
        <RouterLink to="/admin" class="home-link">← 관리자 홈</RouterLink>

        <div class="head-actions">
          <!-- ✅ 새 전시 / 새 특강 분리 -->
          <button type="button" class="btn" @click="newExhibition" :disabled="saving">
            새 전시
          </button>
          <button type="button" class="btn" @click="newLecture" :disabled="saving">
            새 특강
          </button>

          <button
            type="button"
            class="btn primary"
            :disabled="!canSave || saving"
            @click="handleSave"
          >
            {{ saving ? "저장 중..." : "저장" }}
          </button>
        </div>
      </div>

      <div class="head-title">
        <h2 class="title">전시/특강 관리</h2>
        <p class="desc">
          전시는 전시폼에서, 전시+특강은 전시폼에서 함께, 특강만은 특강폼에서 등록합니다.
        </p>
        <p v-if="errorMsg" class="msg error">{{ errorMsg }}</p>
        <p v-if="okMsg" class="msg ok">{{ okMsg }}</p>
      </div>
    </header>

    <!-- ✅ 전체를 한 컬럼으로: 상단 폼 / 하단 목록 -->
    <section class="layout single">
      <!-- TOP: 폼 -->
      <main class="panel form-panel">
        <div class="panel-head">
          <div class="panel-title">
            <span v-if="mode === 'exhibition'">전시 등록 / 수정</span>
            <span v-else>특강 등록 / 수정</span>
          </div>
          <div class="panel-sub">
            <span v-if="mode === 'exhibition'">전시를 저장합니다. 특강이 있으면 아래에서 함께 작성하세요.</span>
            <span v-else>특강만 저장합니다. (전시에 연결하려면 전시폼에서 등록)</span>
          </div>
        </div>

        <div class="panel-body form">
          <!-- ✅ 전시 폼 -->
          <template v-if="mode === 'exhibition'">
            <div class="grid">
              <label class="field">
                <span class="label">전시 제목</span>
                <input v-model="exForm.title" class="input" type="text" placeholder="예) 봄의 색채" />
              </label>

              <label class="field">
                <span class="label">작가명</span>
                <input v-model="exForm.artistName" class="input" type="text" placeholder="예) 홍길동" />
              </label>

              <label class="field">
                <span class="label">카드 이름</span>
                <input v-model="exForm.cardName" class="input" type="text" placeholder="예) 영선갤러리 기획전" />
              </label>

              <label class="field">
                <span class="label">전시 시작일</span>
                <input v-model="exForm.startDate" class="input" type="date" />
              </label>

              <label class="field">
                <span class="label">전시 종료일</span>
                <input v-model="exForm.endDate" class="input" type="date" />
              </label>

              <label class="field wide">
                <span class="label">전시 포스터 이미지 URL</span>
                <input
                  v-model="exForm.imageUrl"
                  class="input"
                  type="url"
                  placeholder="https://..."
                />
                <span class="hint">
                  전시+특강 같이 진행 시, 특강 포스터 URL이 비어있으면 전시 포스터를 사용합니다.
                </span>
              </label>
            </div>

            <div class="divider"></div>

            <!-- 특강 토글 -->
            <div class="toggle-row">
              <div class="toggle-left">
                <div class="toggle-title">특강</div>
                <div class="toggle-desc">전시와 함께 특강이 진행되는 경우 체크</div>
              </div>

              <label class="switch">
                <input v-model="exForm.hasLecture" type="checkbox" />
                <span class="slider"></span>
              </label>
            </div>

            <!-- 특강 폼(전시에 딸린 특강) -->
            <section v-if="exForm.hasLecture" class="lecture-box">
              <div class="lecture-head">
                <div>
                  <div class="lecture-title">특강 정보</div>
                  <div class="lecture-sub">특강 포스터 URL은 비워도 됩니다(전시 포스터 사용)</div>
                </div>
              </div>

              <div class="grid">
                <label class="field">
                  <span class="label">특강명</span>
                  <input v-model="lecInEx.title" class="input" type="text" placeholder="예) 작가와의 대화" />
                </label>

                <label class="field">
                  <span class="label">강사</span>
                  <input v-model="lecInEx.instructor" class="input" type="text" placeholder="예) 홍길동" />
                </label>

                <label class="field">
                  <span class="label">특강 날짜</span>
                  <input v-model="lecInEx.date" class="input" type="date" />
                </label>

                <label class="field">
                  <span class="label">특강 시간</span>
                  <input v-model="lecInEx.time" class="input" type="time" />
                </label>

                <label class="field wide">
                  <span class="label">특강 이미지 URL (선택)</span>
                  <input v-model="lecInEx.imageUrl" class="input" type="url" placeholder="비워도 됨" />
                </label>
              </div>
            </section>

            <div class="divider"></div>

            <!-- 미리보기 -->
            <section class="preview">
              <div class="preview-head">
                <div class="panel-title">미리보기</div>
                <div class="panel-sub">전시 카드 + (옵션) 특강 카드</div>
              </div>

              <div class="preview-card">
                <div class="pv-title">{{ exForm.title || "전시 제목" }}</div>
                <div class="pv-meta">
                  <span>{{ exForm.artistName || "작가명" }}</span>
                  <span class="dot">·</span>
                  <span>{{ exForm.cardName || "카드 이름" }}</span>
                </div>
                <div class="pv-date">
                  <span>{{ exForm.startDate || "YYYY-MM-DD" }}</span>
                  <span> ~ </span>
                  <span>{{ exForm.endDate || "YYYY-MM-DD" }}</span>
                </div>

                <div class="pv-row">
                  <span class="badge">전시</span>
                  <span class="badge" v-if="exForm.hasLecture">특강 포함</span>
                  <span class="badge ghost" v-if="exForm.imageUrl">포스터</span>
                </div>

                <div v-if="exForm.hasLecture" class="pv-lecture">
                  <div class="pv-lecture-title">특강: {{ lecInEx.title || "특강명" }}</div>
                  <div class="pv-lecture-meta">
                    <span>{{ lecInEx.instructor || "강사" }}</span>
                    <span class="dot">·</span>
                    <span>{{ lecInEx.date || "YYYY-MM-DD" }} {{ lecInEx.time || "HH:MM" }}</span>
                  </div>
                  <div class="pv-lecture-note">
                    포스터:
                    {{
                      lecInEx.imageUrl
                        ? "특강 이미지 URL"
                        : (exForm.imageUrl ? "전시 포스터 사용" : "없음")
                    }}
                  </div>
                </div>
              </div>
            </section>
          </template>

          <!-- ✅ 특강 전용 폼(특강만) -->
          <template v-else>
            <div class="grid">
              <label class="field">
                <span class="label">특강명</span>
                <input v-model="lecOnly.title" class="input" type="text" placeholder="예) 작가와의 대화" />
              </label>

              <label class="field">
                <span class="label">강사</span>
                <input v-model="lecOnly.instructor" class="input" type="text" placeholder="예) 홍길동" />
              </label>

              <label class="field">
                <span class="label">특강 날짜</span>
                <input v-model="lecOnly.date" class="input" type="date" />
              </label>

              <label class="field">
                <span class="label">특강 시간</span>
                <input v-model="lecOnly.time" class="input" type="time" />
              </label>

              <label class="field wide">
                <span class="label">특강 이미지 URL (선택)</span>
                <input v-model="lecOnly.imageUrl" class="input" type="url" placeholder="https://... (선택)" />
              </label>
            </div>

            <div class="divider"></div>

            <section class="preview">
              <div class="preview-head">
                <div class="panel-title">미리보기</div>
                <div class="panel-sub">특강 카드</div>
              </div>

              <div class="preview-card">
                <div class="pv-title">{{ lecOnly.title || "특강명" }}</div>
                <div class="pv-meta">
                  <span>{{ lecOnly.instructor || "강사" }}</span>
                  <span class="dot">·</span>
                  <span>{{ (lecOnly.date || "YYYY-MM-DD") }} {{ (lecOnly.time || "HH:MM") }}</span>
                </div>

                <div class="pv-row">
                  <span class="badge">특강</span>
                  <span class="badge ghost" v-if="lecOnly.imageUrl">포스터</span>
                </div>
              </div>
            </section>
          </template>
        </div>
      </main>

      <!-- BOTTOM: 목록/검색 -->
      <aside class="panel list-panel">
        <div class="panel-head">
          <div class="panel-title">목록</div>
          <div class="panel-sub">전시/특강을 검색하고 선택하여 수정</div>
        </div>

        <div class="panel-body list-wrap">
          <!-- ✅ 탭 필터: 전시/특강 -->
          <div class="tabs" role="tablist" aria-label="필터">
            <button
              type="button"
              class="tab"
              :class="{ active: filterTab === 'all' }"
              @click="filterTab = 'all'"
            >
              전체
            </button>
            <button
              type="button"
              class="tab"
              :class="{ active: filterTab === 'exhibition' }"
              @click="filterTab = 'exhibition'"
            >
              전시
            </button>
            <button
              type="button"
              class="tab"
              :class="{ active: filterTab === 'lecture' }"
              @click="filterTab = 'lecture'"
            >
              특강
            </button>
          </div>

          <div class="search-row">
            <input
              v-model="q"
              class="search"
              type="text"
              placeholder="전시/특강 제목, 작가/강사, 카드명, 기간/일시 검색"
            />
          </div>

          <div class="list">
            <button
              v-for="item in filteredCards"
              :key="item.key"
              type="button"
              class="list-item row"
              :class="{ active: selectedKey === item.key }"
              @click="selectCard(item)"
            >
              <div class="thumb">
                <img v-if="item.imageUrl" :src="item.imageUrl" alt="" loading="lazy" />
                <div v-else class="thumb-ph"></div>
              </div>

              <div class="li-main">
                <div class="li-title">{{ item.title || "(제목 없음)" }}</div>
                <div class="li-meta">
                  <span>{{ item.sub1 || "-" }}</span>
                  <span class="dot">·</span>
                  <span>{{ item.sub2 || "-" }}</span>
                </div>
                <div class="li-badges">
                  <span class="badge" v-if="item.type === 'exhibition'">전시</span>
                  <span class="badge" v-else>특강</span>
                  <span v-if="item.type === 'exhibition' && item.hasLecture" class="badge">특강 포함</span>
                  <span v-if="item.imageUrl" class="badge ghost">포스터</span>
                </div>
              </div>
            </button>

            <div v-if="!loading && filteredCards.length === 0" class="empty">
              데이터가 없습니다.
            </div>
            <div v-if="loading" class="empty">불러오는 중...</div>
          </div>
        </div>

        <div class="panel-foot">
          <button
            type="button"
            class="btn danger subtle"
            :disabled="!selectedKey || saving"
            @click="handleDelete"
          >
            {{ saving ? "처리 중..." : "삭제" }}
          </button>
        </div>
      </aside>
    </section>
  </section>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onBeforeUnmount } from "vue";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  Timestamp,
  writeBatch,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * 목표 동작(요청 반영)
 * 1) 전시폼만 작성 → 전시 카드만 표시
 * 2) 전시+특강 작성(전시폼 내) → 전시 카드 + 특강 카드 표시
 * 3) 특강만 표시 → 특강 전용 폼에서만 작성(전시와 연결 안 함)
 * 4) 전시 카드 클릭 시 전시가 메인(특강으로 "넘어가지" 않음)
 */

const mode = ref("exhibition"); // 'exhibition' | 'lecture'
const filterTab = ref("all"); // 'all' | 'exhibition' | 'lecture'

const qText = ref("");
const q = qText;

const saving = ref(false);
const loading = ref(true);
const errorMsg = ref("");
const okMsg = ref("");

const selectedKey = ref(""); // 카드 키(타입+id)
const selectedType = ref(""); // 'exhibition' | 'lecture'
const selectedId = ref(""); // 해당 타입의 id

// ✅ 전시 폼
const exForm = reactive({
  title: "",
  artistName: "",
  cardName: "",
  startDate: "",
  endDate: "",
  imageUrl: "",
  hasLecture: false,
  lectureId: "",
});

// ✅ 전시 안에 포함되는 특강 폼(연결형)
const lecInEx = reactive({
  title: "",
  instructor: "",
  date: "",
  time: "",
  imageUrl: "",
});

// ✅ 특강 전용 폼(단독형)
const lecOnly = reactive({
  title: "",
  instructor: "",
  date: "",
  time: "",
  imageUrl: "",
});

function clearMsgs() {
  errorMsg.value = "";
  okMsg.value = "";
}
function setOk(msg) {
  okMsg.value = msg;
  errorMsg.value = "";
  setTimeout(() => {
    if (okMsg.value === msg) okMsg.value = "";
  }, 3000);
}
function setErr(msg) {
  errorMsg.value = msg;
  okMsg.value = "";
}

function dateToTimestamp(dateStr) {
  if (!dateStr) return null;
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return Timestamp.fromDate(d);
}
function lectureDateTimeToTimestamp(dateStr, timeStr) {
  if (!dateStr) return null;
  const t = timeStr || "00:00";
  const d = new Date(`${dateStr}T${t}:00`);
  if (Number.isNaN(d.getTime())) return null;
  return Timestamp.fromDate(d);
}

function tsToDateInput(ts) {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function tsToTimeInput(ts) {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  if (Number.isNaN(d.getTime())) return "";
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mi}`;
}
function toMillisMaybe(v) {
  if (!v) return 0;
  if (v?.toMillis) return v.toMillis();
  const d = new Date(v);
  const ms = d.getTime();
  return Number.isNaN(ms) ? 0 : ms;
}

function formatLectureText(lec) {
  const d = lec?.dateTime ? tsToDateInput(lec.dateTime) : "";
  const t = lec?.dateTime ? tsToTimeInput(lec.dateTime) : "";
  if (d && t) return `${d} ${t}`;
  if (d) return d;
  return "-";
}

/** 영구데이터(정본) */
const base = ref({ exhibitions: [], lectures: [] });

async function loadLatestJson() {
  try {
    const baseUrl = import.meta.env.BASE_URL || "/";
    const url = `${baseUrl}data/exhibitions.json`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return;

    const payload = await res.json();
    const ex = Array.isArray(payload?.data?.exhibitions) ? payload.data.exhibitions : [];
    const le = Array.isArray(payload?.data?.lectures) ? payload.data.lectures : [];

    base.value.exhibitions = ex.filter((x) => x && !x.deleted);
    base.value.lectures = le.filter((x) => x && !x.deleted);
  } catch {
    // 실패해도 Firestore 오버레이로 운영 가능
  }
}

/** Firestore 오버레이 */
const exOverlay = ref([]);
const lecOverlay = ref([]);

let unsubEx = null;
let unsubLec = null;

function mergeById(baseArr, overlayArr) {
  const map = new Map();
  (baseArr || []).forEach((x) => {
    if (x && x.id) map.set(x.id, { ...x });
  });

  (overlayArr || []).forEach((x) => {
    if (!x || !x.id) return;
    if (x.deleted) map.delete(x.id);
    else {
      const prev = map.get(x.id) || {};
      map.set(x.id, { ...prev, ...x, id: x.id });
    }
  });

  return Array.from(map.values());
}

function exhibitionSortKey(x) {
  const a =
    toMillisMaybe(x.startDate) ||
    toMillisMaybe(x.endDate) ||
    toMillisMaybe(x.updatedAt) ||
    toMillisMaybe(x.createdAt);
  return a || 0;
}

const mergedLectures = computed(() => {
  const out = mergeById(base.value.lectures, lecOverlay.value);
  return out
    .filter((x) => x && x.id && !x.deleted)
    .sort((a, b) => {
      const am =
        toMillisMaybe(a.dateTime) ||
        toMillisMaybe(a.updatedAt) ||
        toMillisMaybe(a.createdAt);
      const bm =
        toMillisMaybe(b.dateTime) ||
        toMillisMaybe(b.updatedAt) ||
        toMillisMaybe(b.createdAt);
      return bm - am;
    });
});

const mergedExhibitions = computed(() => {
  const out = mergeById(base.value.exhibitions, exOverlay.value);
  return out
    .filter((x) => x && x.id && !x.deleted)
    .map((x) => {
      const sd = x.startDate ? tsToDateInput(x.startDate) : "";
      const ed = x.endDate ? tsToDateInput(x.endDate) : "";
      const periodText = sd && ed ? `${sd} ~ ${ed}` : (sd || ed || "-");
      return {
        id: x.id,
        title: x.title || "",
        artistName: x.artistName || "",
        cardName: x.cardName || "",
        imageUrl: x.imageUrl || "",
        hasLecture: !!x.hasLecture,
        lectureId: x.lectureId || "",
        startDate: x.startDate || null,
        endDate: x.endDate || null,
        createdAt: x.createdAt || null,
        updatedAt: x.updatedAt || null,
        periodText,
      };
    })
    .sort((a, b) => exhibitionSortKey(b) - exhibitionSortKey(a));
});

/** ✅ 카드 목록 생성 규칙
 * - 전시: 항상 전시 카드 1개
 * - 전시+특강: 전시 카드 + (연결 특강 카드) 1개
 * - 특강만: lecture.exhibitionId 없는 특강을 특강 카드로 표시(전용 폼에서 만든 것)
 */
const cards = computed(() => {
  const exMap = new Map(mergedExhibitions.value.map((x) => [x.id, x]));

  const list = [];

  // 전시 카드
  mergedExhibitions.value.forEach((ex) => {
    list.push({
      key: `ex:${ex.id}`,
      type: "exhibition",
      id: ex.id,
      title: ex.title,
      sub1: ex.artistName || "-",
      sub2: ex.periodText,
      imageUrl: ex.imageUrl || "",
      hasLecture: !!ex.hasLecture,
    });
  });

  // 특강 카드 (전시 연결형 + 단독형)
  mergedLectures.value.forEach((lec) => {
    const exId = lec.exhibitionId || "";
    const ex = exId ? exMap.get(exId) : null;

    // 전시 연결형: 전시가 있고, 전시가 hasLecture=true인 경우에만 "같이 있는" 특강으로 노출
    const isLinked =
      !!exId && !!ex && !!ex.hasLecture && (ex.lectureId ? ex.lectureId === lec.id : true);

    // 단독형: exhibitionId가 비어있으면 노출
    const isStandalone = !exId;

    if (!isLinked && !isStandalone) return;

    const fallbackImage = ex?.imageUrl || "";
    list.push({
      key: `lec:${lec.id}`,
      type: "lecture",
      id: lec.id,
      exhibitionId: exId || "",
      title: lec.title || "",
      sub1: lec.instructor || "-",
      sub2: formatLectureText(lec),
      imageUrl: (lec.imageUrl || "").trim() || fallbackImage,
      hasLecture: false,
    });
  });

  // 최신순: 전시/특강 각자 날짜 기반으로 섞어서 정렬
  function cardSortKey(c) {
    if (c.type === "exhibition") {
      const ex = mergedExhibitions.value.find((x) => x.id === c.id);
      return ex ? exhibitionSortKey(ex) : 0;
    }
    const lec = mergedLectures.value.find((x) => x.id === c.id);
    return (
      toMillisMaybe(lec?.dateTime) ||
      toMillisMaybe(lec?.updatedAt) ||
      toMillisMaybe(lec?.createdAt) ||
      0
    );
  }

  return list.sort((a, b) => cardSortKey(b) - cardSortKey(a));
});

/** ✅ 탭 + 검색 */
const filteredCards = computed(() => {
  const s = (qText.value || "").trim().toLowerCase();

  let arr = cards.value;

  if (filterTab.value === "exhibition") arr = arr.filter((x) => x.type === "exhibition");
  if (filterTab.value === "lecture") arr = arr.filter((x) => x.type === "lecture");

  if (!s) return arr;

  return arr.filter((x) => {
    return (
      (x.title || "").toLowerCase().includes(s) ||
      (x.sub1 || "").toLowerCase().includes(s) ||
      (x.sub2 || "").toLowerCase().includes(s)
    );
  });
});

onMounted(async () => {
  loading.value = true;
  await loadLatestJson();

  unsubEx = onSnapshot(
    collection(db, "exhibitions"),
    (snap) => {
      exOverlay.value = snap.docs.map((d) => ({ id: d.id, ...(d.data() || {}) }));
      loading.value = false;
    },
    (err) => {
      loading.value = false;
      setErr(err?.message || "전시 임시 기록(Firestore)을 불러오지 못했습니다.");
    }
  );

  unsubLec = onSnapshot(
    collection(db, "lectures"),
    (snap) => {
      lecOverlay.value = snap.docs.map((d) => ({ id: d.id, ...(d.data() || {}) }));
    },
    (err) => {
      setErr(err?.message || "특강 임시 기록(Firestore)을 불러오지 못했습니다.");
    }
  );
});

onBeforeUnmount(() => {
  if (unsubEx) unsubEx();
  if (unsubLec) unsubLec();
});

function findExById(id) {
  return mergedExhibitions.value.find((x) => x.id === id) || null;
}
function findLectureById(id) {
  return mergedLectures.value.find((x) => x.id === id) || null;
}
function findLectureByExhibitionId(exId) {
  return mergedLectures.value.find((x) => x.exhibitionId === exId) || null;
}

/** ✅ 새 전시 / 새 특강 */
function newExhibition() {
  clearMsgs();
  mode.value = "exhibition";
  selectedKey.value = "";
  selectedType.value = "";
  selectedId.value = "";

  exForm.title = "";
  exForm.artistName = "";
  exForm.cardName = "";
  exForm.startDate = "";
  exForm.endDate = "";
  exForm.imageUrl = "";
  exForm.hasLecture = false;
  exForm.lectureId = "";

  lecInEx.title = "";
  lecInEx.instructor = "";
  lecInEx.date = "";
  lecInEx.time = "";
  lecInEx.imageUrl = "";

  // 특강전용 폼도 초기화
  lecOnly.title = "";
  lecOnly.instructor = "";
  lecOnly.date = "";
  lecOnly.time = "";
  lecOnly.imageUrl = "";
}

function newLecture() {
  clearMsgs();
  mode.value = "lecture";
  selectedKey.value = "";
  selectedType.value = "";
  selectedId.value = "";

  // 특강 전용 폼 초기화
  lecOnly.title = "";
  lecOnly.instructor = "";
  lecOnly.date = "";
  lecOnly.time = "";
  lecOnly.imageUrl = "";

  // 전시폼은 건드리지 않음(하지만 선택 해제는 함)
  exForm.lectureId = "";
  lecInEx.title = "";
  lecInEx.instructor = "";
  lecInEx.date = "";
  lecInEx.time = "";
  lecInEx.imageUrl = "";
}

/** ✅ 카드 선택: 전시카드는 전시가 메인 */
async function selectCard(item) {
  clearMsgs();
  selectedKey.value = item.key;
  selectedType.value = item.type;
  selectedId.value = item.id;

  if (item.type === "exhibition") {
    mode.value = "exhibition";

    const ex = findExById(item.id);
    if (!ex) return setErr("전시 데이터를 찾을 수 없습니다.");

    exForm.title = ex.title || "";
    exForm.artistName = ex.artistName || "";
    exForm.cardName = ex.cardName || "";
    exForm.imageUrl = ex.imageUrl || "";
    exForm.startDate = ex.startDate ? tsToDateInput(ex.startDate) : "";
    exForm.endDate = ex.endDate ? tsToDateInput(ex.endDate) : "";
    exForm.hasLecture = !!ex.hasLecture;
    exForm.lectureId = ex.lectureId || "";

    // 전시에 특강이 있으면 같이 로드(하지만 화면은 전시폼 유지)
    lecInEx.title = "";
    lecInEx.instructor = "";
    lecInEx.date = "";
    lecInEx.time = "";
    lecInEx.imageUrl = "";

    if (exForm.hasLecture) {
      let lec = null;
      if (exForm.lectureId) lec = findLectureById(exForm.lectureId);
      if (!lec) {
        lec = findLectureByExhibitionId(item.id);
        if (lec?.id) exForm.lectureId = lec.id;
      }
      if (lec) {
        lecInEx.title = lec.title || "";
        lecInEx.instructor = lec.instructor || "";
        lecInEx.imageUrl = lec.imageUrl || "";
        lecInEx.date = lec.dateTime ? tsToDateInput(lec.dateTime) : "";
        lecInEx.time = lec.dateTime ? tsToTimeInput(lec.dateTime) : "";
      }
    }
    return;
  }

  // lecture 카드 선택 → 특강 전용 폼
  mode.value = "lecture";

  const lec = findLectureById(item.id);
  if (!lec) return setErr("특강 데이터를 찾을 수 없습니다.");

  // 전시 연결 특강도 목록에 보이지만, 편집은 여기서 가능(단, 전시에 연결/해제는 전시폼에서 하는 구조 유지)
  lecOnly.title = lec.title || "";
  lecOnly.instructor = lec.instructor || "";
  lecOnly.imageUrl = lec.imageUrl || "";
  lecOnly.date = lec.dateTime ? tsToDateInput(lec.dateTime) : "";
  lecOnly.time = lec.dateTime ? tsToTimeInput(lec.dateTime) : "";
}

/** ✅ 저장 가능 여부 */
const canSave = computed(() => {
  if (saving.value) return false;

  if (mode.value === "exhibition") {
    const exTitleOk = (exForm.title || "").trim().length > 0;
    if (!exTitleOk) return false;

    if (!exForm.hasLecture) return true;

    const lecTitleOk = (lecInEx.title || "").trim().length > 0;
    const lecDateOk = !!lecInEx.date;
    return lecTitleOk && lecDateOk;
  }

  // lecture-only
  const tOk = (lecOnly.title || "").trim().length > 0;
  const dOk = !!lecOnly.date;
  return tOk && dOk;
});

/** ✅ 저장 */
async function handleSave() {
  clearMsgs();

  if (!canSave.value) {
    if (mode.value === "exhibition") setErr("전시 제목은 필수입니다.");
    else setErr("특강명/특강 날짜는 필수입니다.");
    return;
  }

  saving.value = true;

  try {
    if (mode.value === "exhibition") {
      // 전시 저장(전시가 메인)
      const exPayload = {
        deleted: false,
        title: (exForm.title || "").trim(),
        artistName: (exForm.artistName || "").trim(),
        cardName: (exForm.cardName || "").trim(),
        imageUrl: (exForm.imageUrl || "").trim(),
        startDate: dateToTimestamp(exForm.startDate),
        endDate: dateToTimestamp(exForm.endDate),
        hasLecture: !!exForm.hasLecture,
        updatedAt: serverTimestamp(),
      };

      let exId = selectedType.value === "exhibition" ? selectedId.value : "";
      if (!exId) {
        const created = await addDoc(collection(db, "exhibitions"), {
          ...exPayload,
          createdAt: serverTimestamp(),
        });
        exId = created.id;
        selectedKey.value = `ex:${exId}`;
        selectedType.value = "exhibition";
        selectedId.value = exId;
      } else {
        await setDoc(doc(db, "exhibitions", exId), exPayload, { merge: true });
      }

      // 전시+특강
      if (exForm.hasLecture) {
        const dt = lectureDateTimeToTimestamp(lecInEx.date, lecInEx.time);

        const lecPayload = {
          deleted: false,
          exhibitionId: exId,
          title: (lecInEx.title || "").trim(),
          instructor: (lecInEx.instructor || "").trim(),
          imageUrl: (lecInEx.imageUrl || "").trim(),
          dateTime: dt,
          updatedAt: serverTimestamp(),
        };

        let lecId = exForm.lectureId;

        if (!lecId) {
          const createdLecture = await addDoc(collection(db, "lectures"), {
            ...lecPayload,
            createdAt: serverTimestamp(),
          });
          lecId = createdLecture.id;
          exForm.lectureId = lecId;
        } else {
          await setDoc(doc(db, "lectures", lecId), lecPayload, { merge: true });
        }

        await setDoc(
          doc(db, "exhibitions", exId),
          { hasLecture: true, lectureId: lecId, deleted: false, updatedAt: serverTimestamp() },
          { merge: true }
        );

        setOk("저장되었습니다. (전시 + 특강)");
      } else {
        // 특강 연결 해제: 기존 연결 특강은 deleted 처리
        if (exForm.lectureId) {
          await setDoc(
            doc(db, "lectures", exForm.lectureId),
            { deleted: true, updatedAt: serverTimestamp(), exhibitionId: exId },
            { merge: true }
          );
          exForm.lectureId = "";
        }

        await setDoc(
          doc(db, "exhibitions", exId),
          { hasLecture: false, lectureId: "", deleted: false, updatedAt: serverTimestamp() },
          { merge: true }
        );

        setOk("저장되었습니다. (전시)");
      }

      return;
    }

    // ✅ 특강 전용 저장(전시 연결 없음)
    const dt = lectureDateTimeToTimestamp(lecOnly.date, lecOnly.time);

    const lecPayload = {
      deleted: false,
      exhibitionId: "", // 단독 특강
      title: (lecOnly.title || "").trim(),
      instructor: (lecOnly.instructor || "").trim(),
      imageUrl: (lecOnly.imageUrl || "").trim(),
      dateTime: dt,
      updatedAt: serverTimestamp(),
    };

    let lecId = selectedType.value === "lecture" ? selectedId.value : "";
    if (!lecId) {
      const createdLecture = await addDoc(collection(db, "lectures"), {
        ...lecPayload,
        createdAt: serverTimestamp(),
      });
      lecId = createdLecture.id;
      selectedKey.value = `lec:${lecId}`;
      selectedType.value = "lecture";
      selectedId.value = lecId;
    } else {
      await setDoc(doc(db, "lectures", lecId), lecPayload, { merge: true });
    }

    setOk("저장되었습니다. (특강)");
  } catch (e) {
    setErr(e?.message || "저장 중 오류가 발생했습니다.");
  } finally {
    saving.value = false;
  }
}

/** ✅ 삭제 */
async function handleDelete() {
  clearMsgs();

  if (!selectedKey.value || !selectedType.value || !selectedId.value) return;
  if (!confirm("정말 삭제할까요? (정해진 시간 발행 시 영구데이터에서도 삭제됩니다)")) return;

  saving.value = true;

  try {
    const batch = writeBatch(db);

    if (selectedType.value === "exhibition") {
      const exId = selectedId.value;

      batch.set(
        doc(db, "exhibitions", exId),
        { deleted: true, updatedAt: serverTimestamp() },
        { merge: true }
      );

      // 연결 특강(lectureId + exhibitionId 매칭)도 삭제 처리
      const ex = findExById(exId);
      if (ex?.lectureId) {
        batch.set(
          doc(db, "lectures", ex.lectureId),
          { deleted: true, updatedAt: serverTimestamp(), exhibitionId: exId },
          { merge: true }
        );
      }

      const lecQ = query(collection(db, "lectures"), where("exhibitionId", "==", exId));
      const lecSnap = await getDocs(lecQ);
      lecSnap.forEach((d) => {
        batch.set(
          doc(db, "lectures", d.id),
          { deleted: true, updatedAt: serverTimestamp(), exhibitionId: exId },
          { merge: true }
        );
      });

      await batch.commit();
      newExhibition();
      setOk("삭제 요청이 기록되었습니다. (전시 + 연결 특강)");
      return;
    }

    // lecture 카드 삭제(단독/연결 특강 모두 가능)
    const lecId = selectedId.value;
    batch.set(
      doc(db, "lectures", lecId),
      { deleted: true, updatedAt: serverTimestamp() },
      { merge: true }
    );
    await batch.commit();

    newLecture();
    setOk("삭제 요청이 기록되었습니다. (특강)");
  } catch (e) {
    setErr(e?.message || "삭제 처리 중 오류가 발생했습니다.");
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Header */
.page-head {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.head-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.home-link {
  font-size: 12px;
  color: #777;
  text-decoration: none;
}
.home-link:hover { color: #111; }

.head-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.desc {
  font-size: 13px;
  color: #666;
  margin: 6px 0 0;
}

.msg {
  margin: 10px 0 0;
  font-size: 12px;
}
.msg.ok { color: #0b6b2f; }
.msg.error { color: #b00020; }

.btn {
  border: 1px solid rgba(0,0,0,0.12);
  background: #fff;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 12px;
  cursor: pointer;
}
.btn:hover { background: rgba(0,0,0,0.03); }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }

.btn.primary {
  background: #111;
  color: #fff;
  border-color: rgba(0,0,0,0.12);
}
.btn.primary:hover { background: #000; }

.btn.danger {
  border-color: rgba(176,0,32,0.22);
  color: #b00020;
}
.btn.danger:hover { background: rgba(176,0,32,0.06); }
.btn.subtle { padding: 8px 10px; border-radius: 9px; }

/* ✅ Single column layout */
.layout.single {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* Panels */
.panel {
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
}

.panel-head {
  padding: 14px 14px 10px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.panel-title {
  font-size: 13px;
  font-weight: 600;
  color: #111;
}

.panel-sub {
  margin-top: 4px;
  font-size: 12px;
  color: #777;
}

.panel-body {
  padding: 14px;
}

.panel-foot {
  padding: 12px 14px;
  border-top: 1px solid rgba(0,0,0,0.06);
  display: flex;
  justify-content: flex-end;
}

/* ✅ 스크롤바 숨김(스크롤은 유지) */
.list-wrap {
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.list-wrap::-webkit-scrollbar { display: none; }

/* Tabs */
.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.tab {
  border: 1px solid rgba(0,0,0,0.10);
  background: #fff;
  border-radius: 999px;
  padding: 8px 10px;
  font-size: 12px;
  cursor: pointer;
}
.tab:hover { background: rgba(0,0,0,0.03); }
.tab.active {
  background: #111;
  color: #fff;
  border-color: rgba(0,0,0,0.12);
}

/* List */
.search-row { margin-bottom: 12px; }

.search {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 12px;
  outline: none;
}

.list {
  display: grid;
  gap: 10px;
}

.list-item {
  width: 100%;
  text-align: left;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  background: #fff;
  padding: 12px;
  cursor: pointer;
}
.list-item:hover { background: rgba(0,0,0,0.02); }
.list-item.active { border-color: rgba(0,0,0,0.18); background: rgba(0,0,0,0.03); }

.list-item.row {
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 12px;
  align-items: center;
}

/* Thumbnail */
.thumb {
  width: 76px;
  height: 76px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.08);
  background: rgba(0,0,0,0.03);
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.thumb-ph {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02));
}

.li-main { min-width: 0; }

.li-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}

.li-meta {
  font-size: 12px;
  color: #666;
}

.li-badges {
  margin-top: 8px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.empty {
  padding: 14px 6px 6px;
  font-size: 12px;
  color: #777;
}

.badge {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.10);
  font-size: 11px;
  color: #333;
  background: rgba(0,0,0,0.03);
}
.badge.ghost {
  background: transparent;
  color: #777;
}

/* Form */
.form { display: flex; flex-direction: column; gap: 14px; }

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field.wide { grid-column: 1 / -1; }

.label {
  font-size: 12px;
  color: #666;
}

.input {
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 12px;
  outline: none;
}
.input:focus { border-color: rgba(0,0,0,0.22); }

.hint {
  font-size: 11px;
  color: #888;
}

.divider {
  height: 1px;
  background: rgba(0,0,0,0.06);
  margin: 2px 0;
}

/* Toggle */
.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
}

.toggle-title {
  font-size: 13px;
  font-weight: 600;
}
.toggle-desc {
  font-size: 12px;
  color: #777;
  margin-top: 4px;
}

.switch {
  position: relative;
  width: 44px;
  height: 26px;
  display: inline-block;
}
.switch input { display: none; }
.slider {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: rgba(0,0,0,0.14);
  transition: all 0.15s ease;
}
.slider:before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  left: 3px;
  top: 3px;
  border-radius: 999px;
  background: #fff;
  transition: all 0.15s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.switch input:checked + .slider {
  background: rgba(0,0,0,0.70);
}
.switch input:checked + .slider:before {
  transform: translateX(18px);
}

/* Lecture box */
.lecture-box {
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  padding: 12px;
  background: rgba(0,0,0,0.02);
}

.lecture-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.lecture-title { font-size: 13px; font-weight: 600; }
.lecture-sub { font-size: 12px; color: #777; margin-top: 4px; }

/* Preview */
.preview-head {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
}

.preview-card {
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  padding: 14px;
}

.pv-title {
  font-size: 14px;
  font-weight: 700;
}

.pv-meta, .pv-date {
  font-size: 12px;
  color: #666;
  margin-top: 6px;
}

.pv-row {
  margin-top: 10px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.pv-lecture {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0,0,0,0.06);
}

.pv-lecture-title {
  font-size: 13px;
  font-weight: 600;
}

.pv-lecture-meta, .pv-lecture-note {
  font-size: 12px;
  color: #666;
  margin-top: 6px;
}

.dot { margin: 0 6px; color: #999; }

@media (max-width: 980px) {
  .grid { grid-template-columns: 1fr; }
  .list-item.row { grid-template-columns: 64px 1fr; }
  .thumb { width: 64px; height: 64px; }
}
</style>
