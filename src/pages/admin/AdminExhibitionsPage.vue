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
          <button type="button" class="btn" @click="resetForm" :disabled="saving">
            새 전시
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
        <h2 class="title">전시 관리</h2>
        <p class="desc">전시를 등록/수정하고, 특강이 있으면 함께 연결합니다.</p>
        <p v-if="errorMsg" class="msg error">{{ errorMsg }}</p>
        <p v-if="okMsg" class="msg ok">{{ okMsg }}</p>
      </div>
    </header>

    <!-- ✅ 전체를 한 컬럼으로: 상단 폼 / 하단 목록 -->
    <section class="layout single">
      <!-- TOP: 전시 폼 -->
      <main class="panel form-panel">
        <div class="panel-head">
          <div class="panel-title">새 전시 / 전시 수정</div>
          <div class="panel-sub">상단에서 입력 후 저장하세요</div>
        </div>

        <div class="panel-body form">
          <div class="grid">
            <label class="field">
              <span class="label">전시 제목</span>
              <input v-model="form.title" class="input" type="text" placeholder="예) 봄의 색채" />
            </label>

            <label class="field">
              <span class="label">작가명</span>
              <input v-model="form.artistName" class="input" type="text" placeholder="예) 홍길동" />
            </label>

            <label class="field">
              <span class="label">카드 이름</span>
              <input v-model="form.cardName" class="input" type="text" placeholder="예) 영선갤러리 기획전" />
            </label>

            <label class="field">
              <span class="label">전시 시작일</span>
              <input v-model="form.startDate" class="input" type="date" />
            </label>

            <label class="field">
              <span class="label">전시 종료일</span>
              <input v-model="form.endDate" class="input" type="date" />
            </label>

            <label class="field wide">
              <span class="label">전시 포스터 이미지 URL</span>
              <input
                v-model="form.imageUrl"
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
              <input v-model="form.hasLecture" type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>

          <!-- 특강 폼 -->
          <section v-if="form.hasLecture" class="lecture-box">
            <div class="lecture-head">
              <div>
                <div class="lecture-title">특강 정보</div>
                <div class="lecture-sub">특강 포스터 URL은 비워도 됩니다(전시 포스터 사용)</div>
              </div>
            </div>

            <div class="grid">
              <label class="field">
                <span class="label">특강명</span>
                <input v-model="lecture.title" class="input" type="text" placeholder="예) 작가와의 대화" />
              </label>

              <label class="field">
                <span class="label">강사</span>
                <input v-model="lecture.instructor" class="input" type="text" placeholder="예) 홍길동" />
              </label>

              <label class="field">
                <span class="label">특강 날짜</span>
                <input v-model="lecture.date" class="input" type="date" />
              </label>

              <label class="field">
                <span class="label">특강 시간</span>
                <input v-model="lecture.time" class="input" type="time" />
              </label>

              <label class="field wide">
                <span class="label">특강 이미지 URL (선택)</span>
                <input v-model="lecture.imageUrl" class="input" type="url" placeholder="비워도 됨" />
              </label>
            </div>
          </section>

          <div class="divider"></div>

          <!-- 미리보기 영역 -->
          <section class="preview">
            <div class="preview-head">
              <div class="panel-title">미리보기</div>
              <div class="panel-sub">표시 구조 확인용</div>
            </div>

            <div class="preview-card">
              <div class="pv-title">{{ form.title || "전시 제목" }}</div>
              <div class="pv-meta">
                <span>{{ form.artistName || "작가명" }}</span>
                <span class="dot">·</span>
                <span>{{ form.cardName || "카드 이름" }}</span>
              </div>
              <div class="pv-date">
                <span>{{ form.startDate || "YYYY-MM-DD" }}</span>
                <span> ~ </span>
                <span>{{ form.endDate || "YYYY-MM-DD" }}</span>
              </div>

              <div class="pv-row">
                <span class="badge" v-if="form.hasLecture">특강 진행</span>
                <span class="badge ghost" v-if="form.imageUrl">포스터 링크</span>
              </div>

              <div v-if="form.hasLecture" class="pv-lecture">
                <div class="pv-lecture-title">
                  특강: {{ lecture.title || "특강명" }}
                </div>
                <div class="pv-lecture-meta">
                  <span>{{ lecture.instructor || "강사" }}</span>
                  <span class="dot">·</span>
                  <span>{{ lecture.date || "YYYY-MM-DD" }} {{ lecture.time || "HH:MM" }}</span>
                </div>
                <div class="pv-lecture-note">
                  포스터:
                  {{
                    lecture.imageUrl
                      ? "특강 이미지 URL"
                      : (form.imageUrl ? "전시 포스터 사용" : "없음")
                  }}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <!-- BOTTOM: 전시 목록/검색 -->
      <aside class="panel list-panel">
        <div class="panel-head">
          <div class="panel-title">전시 목록</div>
          <div class="panel-sub">필터/검색 후 선택하여 수정</div>
        </div>

        <div class="panel-body list-wrap">
          <!-- ✅ 태그 필터 -->
          <div class="tabs" role="tablist" aria-label="전시 필터">
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
              placeholder="전시 제목/작가/카드 이름 검색"
            />
          </div>

          <div class="list">
            <button
              v-for="item in filtered"
              :key="item.id"
              type="button"
              class="list-item row"
              :class="{ active: selectedId === item.id }"
              @click="select(item.id)"
            >
              <!-- ✅ 썸네일을 카드 왼쪽에 -->
              <div class="thumb">
                <img v-if="item.imageUrl" :src="item.imageUrl" alt="" loading="lazy" />
                <div v-else class="thumb-ph"></div>
              </div>

              <div class="li-main">
                <div class="li-title">{{ item.title || "(제목 없음)" }}</div>
                <div class="li-meta">
                  <span>{{ item.artistName || "-" }}</span>
                  <span class="dot">·</span>
                  <span>{{ item.periodText }}</span>
                </div>
                <div class="li-badges">
                  <span v-if="item.hasLecture" class="badge">특강</span>
                  <span v-if="item.imageUrl" class="badge ghost">포스터</span>
                </div>
              </div>
            </button>

            <div v-if="!loading && filtered.length === 0" class="empty">
              전시 데이터가 없습니다.
            </div>
            <div v-if="loading" class="empty">불러오는 중...</div>
          </div>
        </div>

        <div class="panel-foot">
          <button
            type="button"
            class="btn danger subtle"
            :disabled="!selectedId || saving"
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
 * 운영 구조
 * - public/data/exhibitions.json : 영구데이터(정본)
 * - Firestore(exhibitions/lectures) : 발행 전 임시 변경/삭제 오버레이
 * - 화면: 정본 + 오버레이 merge 결과
 * - 삭제: deleteDoc가 아니라 deleted:true 기록
 */

const qText = ref("");
const q = qText;

const filterTab = ref("all"); // 'all' | 'exhibition' | 'lecture'

const selectedId = ref("");
const saving = ref(false);
const loading = ref(true);
const errorMsg = ref("");
const okMsg = ref("");

const form = reactive({
  title: "",
  artistName: "",
  cardName: "",
  startDate: "",
  endDate: "",
  imageUrl: "",
  hasLecture: false,
  lectureId: "",
});

const lecture = reactive({
  title: "",
  instructor: "",
  date: "",
  time: "",
  imageUrl: "",
});

/**
 * ✅ FIX: "전시 없이 특강만" 저장 허용
 * - 전시 제목이 비어있고 hasLecture=true인 경우:
 *   canSave는 특강 필수값(특강명/날짜) 기준으로 활성화
 * - 저장 시 전시 문서가 필요하므로(기존 구조 유지):
 *   전시 제목이 없으면 "특강명"을 전시 제목으로 자동 사용
 */
const canSave = computed(() => {
  if (saving.value) return false;

  const exTitleOk = (form.title || "").trim().length > 0;

  if (!form.hasLecture) {
    return exTitleOk;
  }

  const lecTitleOk = (lecture.title || "").trim().length > 0;
  const lecDateOk = !!lecture.date;

  // 특강만 등록 가능
  return (exTitleOk || (lecTitleOk && lecDateOk)) && lecTitleOk && lecDateOk;
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

/** 영구데이터(정본) */
const base = ref({
  exhibitions: [],
  lectures: [],
});

async function loadLatestJson() {
  try {
    // ✅ FIX: GH Pages 대응 (절대경로 "/data/..." 금지)
    // import.meta.env.BASE_URL 예) "/website/" 형태로 들어올 수 있음
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

/** Firestore 오버레이(임시 기록) */
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
    if (x.deleted) {
      map.delete(x.id);
    } else {
      const prev = map.get(x.id) || {};
      map.set(x.id, { ...prev, ...x, id: x.id });
    }
  });

  return Array.from(map.values());
}

/** ✅ 최신 날짜가 위로: startDate(우선) → endDate → updatedAt/createdAt 순 */
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

/** ✅ 탭 + 검색 필터 */
const filtered = computed(() => {
  const s = (qText.value || "").trim().toLowerCase();

  let arr = mergedExhibitions.value;

  if (filterTab.value === "lecture") {
    arr = arr.filter((x) => !!x.hasLecture);
  } else if (filterTab.value === "exhibition") {
    arr = arr.filter((x) => !x.hasLecture);
  }

  if (!s) return arr;

  return arr.filter((x) => {
    return (
      (x.title || "").toLowerCase().includes(s) ||
      (x.artistName || "").toLowerCase().includes(s) ||
      (x.cardName || "").toLowerCase().includes(s) ||
      (x.periodText || "").toLowerCase().includes(s)
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

/** 선택 */
async function select(id) {
  clearMsgs();
  selectedId.value = id;

  try {
    const ex = findExById(id);
    if (!ex) {
      setErr("전시 데이터를 찾을 수 없습니다.");
      return;
    }

    form.title = ex.title || "";
    form.artistName = ex.artistName || "";
    form.cardName = ex.cardName || "";
    form.imageUrl = ex.imageUrl || "";
    form.startDate = ex.startDate ? tsToDateInput(ex.startDate) : "";
    form.endDate = ex.endDate ? tsToDateInput(ex.endDate) : "";

    form.hasLecture = !!ex.hasLecture;
    form.lectureId = ex.lectureId || "";

    lecture.title = "";
    lecture.instructor = "";
    lecture.date = "";
    lecture.time = "";
    lecture.imageUrl = "";

    if (form.hasLecture) {
      let lec = null;

      if (form.lectureId) lec = findLectureById(form.lectureId);
      if (!lec) {
        lec = findLectureByExhibitionId(id);
        if (lec?.id) form.lectureId = lec.id;
      }

      if (lec) {
        lecture.title = lec.title || "";
        lecture.instructor = lec.instructor || "";
        lecture.imageUrl = lec.imageUrl || "";
        lecture.date = lec.dateTime ? tsToDateInput(lec.dateTime) : "";
        lecture.time = lec.dateTime ? tsToTimeInput(lec.dateTime) : "";
      }
    }
  } catch (e) {
    setErr(e?.message || "전시 로딩 중 오류가 발생했습니다.");
  }
}

/** 폼 초기화 */
function resetForm() {
  clearMsgs();
  selectedId.value = "";

  form.title = "";
  form.artistName = "";
  form.cardName = "";
  form.startDate = "";
  form.endDate = "";
  form.imageUrl = "";
  form.hasLecture = false;
  form.lectureId = "";

  lecture.title = "";
  lecture.instructor = "";
  lecture.date = "";
  lecture.time = "";
  lecture.imageUrl = "";
}

/** 저장: Firestore(임시 기록)에만 저장 */
async function handleSave() {
  clearMsgs();

  // ✅ FIX: 특강만 등록 시 전시 제목이 없어도 통과
  const exTitle = (form.title || "").trim();
  const lecTitle = (lecture.title || "").trim();

  if (!form.hasLecture) {
    if (!exTitle) {
      setErr("전시 제목은 필수입니다.");
      return;
    }
  } else {
    if (!lecTitle) {
      setErr("특강명이 필요합니다.");
      return;
    }
    if (!lecture.date) {
      setErr("특강 날짜가 필요합니다.");
      return;
    }
  }

  saving.value = true;

  try {
    // ✅ FIX: 전시 없이 특강만 입력한 경우, 전시 제목은 특강명으로 자동 채움(기존 데이터 구조 유지)
    const finalExTitle = exTitle || (form.hasLecture ? lecTitle : "");
    const finalStartDate = form.startDate || (form.hasLecture ? lecture.date : "");
    const finalEndDate = form.endDate || "";

    const exPayload = {
      deleted: false,
      title: (finalExTitle || "").trim(),
      artistName: (form.artistName || "").trim(),
      cardName: (form.cardName || "").trim(),
      imageUrl: (form.imageUrl || "").trim(),
      startDate: dateToTimestamp(finalStartDate),
      endDate: dateToTimestamp(finalEndDate),
      hasLecture: !!form.hasLecture,
      updatedAt: serverTimestamp(),
    };

    let exId = selectedId.value;

    if (!exId) {
      const created = await addDoc(collection(db, "exhibitions"), {
        ...exPayload,
        createdAt: serverTimestamp(),
      });
      exId = created.id;
      selectedId.value = exId;
    } else {
      await setDoc(doc(db, "exhibitions", exId), exPayload, { merge: true });
    }

    if (form.hasLecture) {
      const dt = lectureDateTimeToTimestamp(lecture.date, lecture.time);

      const lecPayload = {
        deleted: false,
        exhibitionId: exId,
        title: (lecture.title || "").trim(),
        instructor: (lecture.instructor || "").trim(),
        imageUrl: (lecture.imageUrl || "").trim(),
        dateTime: dt,
        updatedAt: serverTimestamp(),
      };

      let lecId = form.lectureId;

      if (!lecId) {
        const createdLecture = await addDoc(collection(db, "lectures"), {
          ...lecPayload,
          createdAt: serverTimestamp(),
        });
        lecId = createdLecture.id;
        form.lectureId = lecId;

        await setDoc(
          doc(db, "exhibitions", exId),
          { hasLecture: true, lectureId: lecId, deleted: false, updatedAt: serverTimestamp() },
          { merge: true }
        );
      } else {
        await setDoc(doc(db, "lectures", lecId), lecPayload, { merge: true });
        await setDoc(
          doc(db, "exhibitions", exId),
          { hasLecture: true, lectureId: lecId, deleted: false, updatedAt: serverTimestamp() },
          { merge: true }
        );
      }
    } else {
      if (form.lectureId) {
        await setDoc(
          doc(db, "lectures", form.lectureId),
          { deleted: true, updatedAt: serverTimestamp(), exhibitionId: exId },
          { merge: true }
        );
        form.lectureId = "";
      }

      await setDoc(
        doc(db, "exhibitions", exId),
        { hasLecture: false, lectureId: "", deleted: false, updatedAt: serverTimestamp() },
        { merge: true }
      );
    }

    setOk("저장되었습니다. (임시 기록에 반영됨)");
  } catch (e) {
    setErr(e?.message || "저장 중 오류가 발생했습니다.");
  } finally {
    saving.value = false;
  }
}

/** 삭제: Firestore에 삭제 요청만 기록(deleted:true) */
async function handleDelete() {
  clearMsgs();

  const exId = selectedId.value;
  if (!exId) return;

  if (!confirm("정말 삭제할까요? (정해진 시간 발행 시 영구데이터에서도 삭제됩니다)")) return;

  saving.value = true;

  try {
    const batch = writeBatch(db);

    batch.set(
      doc(db, "exhibitions", exId),
      { deleted: true, updatedAt: serverTimestamp() },
      { merge: true }
    );

    if (form.lectureId) {
      batch.set(
        doc(db, "lectures", form.lectureId),
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

    resetForm();
    setOk("삭제 요청이 기록되었습니다. (발행 시 영구데이터 반영)");
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
