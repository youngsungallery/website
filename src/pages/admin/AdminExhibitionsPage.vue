<!-- FILE: src/components/admin/AdminExhibitionsPage.vue -->

<template>
  <section class="admin-page">
    <header class="page-head">
      <div class="head-top">
        <RouterLink to="/admin" class="home-link">← 관리자 홈</RouterLink>
      </div>

      <div class="head-title">
        <h2 class="title">전시 / 특강 관리</h2>
        <p class="desc">
          목록에서 선택하면 오른쪽에서 편집합니다. 전시는 특강을 “여러 개 연결(lectureIds)”할 수 있어요.
        </p>
        <p v-if="errorMsg" class="msg error">{{ errorMsg }}</p>
        <p v-if="okMsg" class="msg ok">{{ okMsg }}</p>
      </div>
    </header>

    <section class="layout">
      <!-- LEFT: 목록 -->
      <main class="panel list-panel">
        <div class="panel-head">
          <div class="panel-title">목록</div>
          <div class="panel-sub">전시/특강을 검색하고 선택하세요</div>
        </div>

        <div class="panel-body list-wrap">
          <div class="tabs" role="tablist" aria-label="필터">
            <button type="button" class="tab" :class="{ active: filterTab === 'exhibition' }" @click="filterTab='exhibition'">
              전시
            </button>
            <button type="button" class="tab" :class="{ active: filterTab === 'lecture' }" @click="filterTab='lecture'">
              특강
            </button>
          </div>

          <div class="search-row">
            <input v-model="q" class="search" type="text" placeholder="제목/작가/강사/기간/일시 검색" />
          </div>

          <div class="pager">
            <div class="pager-left">
              <span class="pager-text">
                총 <b>{{ totalItems }}</b>개 ·
                <b>{{ page }}</b>/<b>{{ totalPages }}</b> 페이지 ·
                페이지당 <b>{{ pageSize }}</b>개
              </span>
            </div>

            <div class="pager-right">
              <button type="button" class="pbtn" :disabled="page <= 1" @click="goFirst">처음</button>
              <button type="button" class="pbtn" :disabled="page <= 1" @click="goPrev">이전</button>

              <button
                v-for="p in pageButtons"
                :key="p"
                type="button"
                class="pbtn num"
                :class="{ active: p === page }"
                @click="goPage(p)"
              >
                {{ p }}
              </button>

              <button type="button" class="pbtn" :disabled="page >= totalPages" @click="goNext">다음</button>
              <button type="button" class="pbtn" :disabled="page >= totalPages" @click="goLast">끝</button>
            </div>
          </div>

          <div class="list">
            <button
              v-for="item in pagedCards"
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
                  <span class="badge">{{ item.type === 'exhibition' ? '전시' : '특강' }}</span>
                  <span v-if="item.type === 'exhibition' && item.lectureCount > 0" class="badge">
                    특강 연결 {{ item.lectureCount }}
                  </span>
                  <span v-if="item.imageUrl" class="badge ghost">포스터</span>
                </div>
              </div>
            </button>

            <div v-if="!loading && pagedCards.length === 0" class="empty">데이터가 없습니다.</div>
            <div v-if="loading" class="empty">불러오는 중...</div>
          </div>
        </div>
      </main>

      <!-- RIGHT: 상세/편집 + 스토리지 -->
      <aside class="right-col">
        <section class="panel detail-panel">
          <div class="panel-head">
            <div class="panel-title">작성 / 수정</div>
            <div class="panel-sub">
              <span v-if="!showForm">선택하거나 “새로 만들기”를 누르면 폼이 열립니다.</span>
              <span v-else>
                <b>{{ formType === 'exhibition' ? '전시' : '특강' }}</b>
                {{ editingId ? '수정' : '신규 등록' }}
              </span>
            </div>
          </div>

          <div class="panel-body">
            <div v-if="!showForm" class="empty-state">
              <div class="empty-title">폼이 닫혀 있어요</div>
              <div class="empty-desc">왼쪽 목록에서 선택하거나, 아래에서 새로 만드세요.</div>

              <div class="empty-actions">
                <button type="button" class="btn" :disabled="saving" @click="openNew('exhibition')">새 전시</button>
                <button type="button" class="btn" :disabled="saving" @click="openNew('lecture')">새 특강</button>
              </div>
            </div>

            <!-- 전시 폼 -->
            <template v-else-if="formType === 'exhibition'">
              <div class="grid">
                <label class="field">
                  <span class="label">전시 제목 *</span>
                  <input v-model="exForm.title" class="input" type="text" placeholder="예) 봄의 색채" />
                </label>

                <label class="field">
                  <span class="label">작가명</span>
                  <input v-model="exForm.artistName" class="input" type="text" placeholder="예) 홍길동" />
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
                  <input v-model="exForm.imageUrl" class="input" type="url" placeholder="https://..." />
                </label>
              </div>

              <div class="divider"></div>

              <!-- ✅ 특강 다중 연결 -->
              <section class="link-box">
                <div class="link-head">
                  <div>
                    <div class="link-title">연결할 특강(복수 선택 가능)</div>
                    <div class="link-sub">드랍다운에서 체크하면 선택됩니다. (lectureIds 배열로 저장)</div>
                  </div>
                </div>

                <div class="dd" ref="lecDdRef">
                  <button
                    type="button"
                    class="dd-btn"
                    :class="{ open: lecDdOpen }"
                    :disabled="saving || lectureOptions.length === 0"
                    @click="toggleLecDd"
                  >
                    <span class="dd-btn-text">{{ selectedLectureLabel }}</span>
                    <span class="dd-caret">▾</span>
                  </button>

                  <div v-if="lecDdOpen" class="dd-menu" role="listbox" aria-multiselectable="true">
                    <label v-for="lec in lectureOptions" :key="lec.id" class="dd-item">
                      <input
                        type="checkbox"
                        class="dd-check"
                        :value="lec.id"
                        v-model="exForm.lectureIds"
                        :disabled="saving"
                      />
                      <span class="dd-item-text">
                        <b class="dd-title">{{ lec.title || "(특강명 없음)" }}</b>
                        <span class="dd-meta">{{ lec.instructor || "-" }} · {{ formatLectureText(lec) }}</span>
                      </span>
                    </label>

                    <div v-if="lectureOptions.length === 0" class="empty-mini">
                      등록된 특강이 없습니다. 먼저 특강을 만들어 주세요.
                    </div>
                  </div>
                </div>

                <!-- 선택된 것이 보여주기 -->
                <div v-if="linkedLectures.length" class="linked-preview">
                  <div class="lp-title">연결됨 ({{ linkedLectures.length }})</div>
                  <div class="lp-list">
                    <div v-for="lec in linkedLectures" :key="lec.id" class="lp-item">
                      <div class="lp-left">
                        <div class="lp-name">{{ lec.title || "(특강명 없음)" }}</div>
                        <div class="lp-meta">{{ lec.instructor || "-" }} · {{ formatLectureText(lec) }}</div>
                      </div>
                      <button type="button" class="btn subtle" :disabled="saving" @click="unlinkLecture(lec.id)">
                        해제
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <div class="divider"></div>

              <div class="actions">
                <button type="button" class="btn" @click="closeForm" :disabled="saving">닫기</button>
                <button type="button" class="btn primary" @click="handleSave" :disabled="!canSave || saving">
                  {{ saving ? "저장 중..." : "저장" }}
                </button>
                <button v-if="editingId" type="button" class="btn danger" @click="handleDelete" :disabled="saving">
                  {{ saving ? "처리 중..." : "삭제" }}
                </button>
              </div>
            </template>

            <!-- 특강 폼 -->
            <template v-else>
              <div class="grid">
                <label class="field">
                  <span class="label">특강명 *</span>
                  <input v-model="lecForm.title" class="input" type="text" placeholder="예) 작가와의 대화" />
                </label>

                <label class="field">
                  <span class="label">강사</span>
                  <input v-model="lecForm.instructor" class="input" type="text" placeholder="예) 홍길동" />
                </label>

                <label class="field">
                  <span class="label">특강 날짜 *</span>
                  <input v-model="lecForm.date" class="input" type="date" />
                </label>

                <label class="field">
                  <span class="label">특강 시간</span>
                  <input v-model="lecForm.time" class="input" type="time" />
                </label>

                <label class="field wide">
                  <span class="label">특강 이미지 URL (선택)</span>
                  <input v-model="lecForm.imageUrl" class="input" type="url" placeholder="https://... (선택)" />
                </label>
              </div>

              <div class="divider"></div>

              <div class="actions">
                <button type="button" class="btn" @click="closeForm" :disabled="saving">닫기</button>
                <button type="button" class="btn primary" @click="handleSave" :disabled="!canSave || saving">
                  {{ saving ? "저장 중..." : "저장" }}
                </button>
                <button v-if="editingId" type="button" class="btn danger" @click="handleDelete" :disabled="saving">
                  {{ saving ? "처리 중..." : "삭제" }}
                </button>
              </div>
            </template>
          </div>
        </section>

        <section class="side-box">
          <StorageUsageBox
            docPath="admin/stats"
            usedField="storageUsedBytes"
            updatedAtField="storageUpdatedAt"
            :limitBytes="1024 ** 3"
            :subscribe="true"
            :showRefresh="true"
            :showInit="true"
            title="Storage"
            note="* 관리자 페이지를 통해 업로드/삭제된 파일 기준으로 계산됩니다."
          />
        </section>
      </aside>
    </section>
  </section>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  deleteField,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

import StorageUsageBox from "@/components/admin/StorageUsageBox.vue";
import { bumpStorageUsedBytes, estimateDocBytes } from "@/lib/storageUsage";

const saving = ref(false);
const loading = ref(true);
const errorMsg = ref("");
const okMsg = ref("");

function clearMsgs() {
  errorMsg.value = "";
  okMsg.value = "";
}
function setOk(msg) {
  okMsg.value = msg;
  errorMsg.value = "";
  setTimeout(() => {
    if (okMsg.value === msg) okMsg.value = "";
  }, 2500);
}
function setErr(msg) {
  errorMsg.value = msg;
  okMsg.value = "";
}

/** ===== Firestore ===== */
const exhibitions = ref([]);
const lectures = ref([]);

let unsubEx = null;
let unsubLec = null;

onMounted(() => {
  loading.value = true;

  unsubEx = onSnapshot(
    collection(db, "exhibitions"),
    (snap) => {
      exhibitions.value = snap.docs.map((d) => ({ id: d.id, ...(d.data() || {}) }));
      loading.value = false;
    },
    (err) => {
      loading.value = false;
      setErr(err?.message || "전시를 불러오지 못했습니다.");
    }
  );

  unsubLec = onSnapshot(
    collection(db, "lectures"),
    (snap) => {
      lectures.value = snap.docs.map((d) => ({ id: d.id, ...(d.data() || {}) }));
    },
    (err) => {
      setErr(err?.message || "특강을 불러오지 못했습니다.");
    }
  );
});

onBeforeUnmount(() => {
  if (unsubEx) unsubEx();
  if (unsubLec) unsubLec();
});

/** ===== Utils ===== */
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

/** ===== List / Search / Paging ===== */
const filterTab = ref("exhibition");
const q = ref("");

const pageSize = 20;
const page = ref(1);

watch([q, filterTab], () => { page.value = 1; });

const exhibitionList = computed(() => {
  const arr = (exhibitions.value || []).slice();
  return arr
    .filter((x) => x && x.id)
    .map((x) => {
      const sd = x.startDate ? tsToDateInput(x.startDate) : "";
      const ed = x.endDate ? tsToDateInput(x.endDate) : "";
      const period = sd && ed ? `${sd} ~ ${ed}` : (sd || ed || "-");
      const lectureIds = Array.isArray(x.lectureIds) ? x.lectureIds.filter(Boolean) : [];
      return { ...x, periodText: period, lectureIds };
    })
    .sort((a, b) => {
      const am =
        toMillisMaybe(a.startDate) ||
        toMillisMaybe(a.endDate) ||
        toMillisMaybe(a.updatedAt) ||
        toMillisMaybe(a.createdAt);
      const bm =
        toMillisMaybe(b.startDate) ||
        toMillisMaybe(b.endDate) ||
        toMillisMaybe(b.updatedAt) ||
        toMillisMaybe(b.createdAt);
      return (bm || 0) - (am || 0);
    });
});

const lectureList = computed(() => {
  const arr = (lectures.value || []).slice();
  return arr
    .filter((x) => x && x.id)
    .sort((a, b) => {
      const am = toMillisMaybe(a.dateTime) || toMillisMaybe(a.updatedAt) || toMillisMaybe(a.createdAt);
      const bm = toMillisMaybe(b.dateTime) || toMillisMaybe(b.updatedAt) || toMillisMaybe(b.createdAt);
      return (bm || 0) - (am || 0);
    });
});

const cards = computed(() => {
  const s = (q.value || "").trim().toLowerCase();

  if (filterTab.value === "exhibition") {
    let arr = exhibitionList.value.map((ex) => ({
      key: `ex:${ex.id}`,
      type: "exhibition",
      id: ex.id,
      title: ex.title || "",
      sub1: ex.artistName || "-",
      sub2: ex.periodText || "-",
      imageUrl: (ex.imageUrl || "").trim(),
      lectureCount: Array.isArray(ex.lectureIds) ? ex.lectureIds.length : 0,
      _raw: ex,
    }));

    if (!s) return arr;
    return arr.filter((x) => {
      return (
        (x.title || "").toLowerCase().includes(s) ||
        (x.sub1 || "").toLowerCase().includes(s) ||
        (x.sub2 || "").toLowerCase().includes(s)
      );
    });
  }

  let arr = lectureList.value.map((lec) => ({
    key: `lec:${lec.id}`,
    type: "lecture",
    id: lec.id,
    title: lec.title || "",
    sub1: lec.instructor || "-",
    sub2: formatLectureText(lec),
    imageUrl: (lec.imageUrl || "").trim(),
    lectureCount: 0,
    _raw: lec,
  }));

  if (!s) return arr;
  return arr.filter((x) => {
    return (
      (x.title || "").toLowerCase().includes(s) ||
      (x.sub1 || "").toLowerCase().includes(s) ||
      (x.sub2 || "").toLowerCase().includes(s)
    );
  });
});

const totalItems = computed(() => cards.value.length);
const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / pageSize)));

const pagedCards = computed(() => {
  const p = Math.min(Math.max(1, page.value), totalPages.value);
  const start = (p - 1) * pageSize;
  const end = start + pageSize;
  return cards.value.slice(start, end);
});

const pageButtons = computed(() => {
  const tp = totalPages.value;
  const cur = Math.min(Math.max(1, page.value), tp);
  const maxBtns = 7;

  let start = Math.max(1, cur - Math.floor(maxBtns / 2));
  let end = start + maxBtns - 1;
  if (end > tp) {
    end = tp;
    start = Math.max(1, end - maxBtns + 1);
  }

  const out = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
});

function goPage(p) { page.value = p; }
function goPrev() { page.value = Math.max(1, page.value - 1); }
function goNext() { page.value = Math.min(totalPages.value, page.value + 1); }
function goFirst() { page.value = 1; }
function goLast() { page.value = totalPages.value; }

/** ===== Form (hidden by default) ===== */
const showForm = ref(false);
const formType = ref("exhibition");
const editingId = ref("");
const selectedKey = ref("");

const exForm = reactive({
  title: "",
  artistName: "",
  startDate: "",
  endDate: "",
  imageUrl: "",
  lectureIds: [],
});

const lecForm = reactive({
  title: "",
  instructor: "",
  date: "",
  time: "",
  imageUrl: "",
});

function resetExForm() {
  exForm.title = "";
  exForm.artistName = "";
  exForm.startDate = "";
  exForm.endDate = "";
  exForm.imageUrl = "";
  exForm.lectureIds = [];
}
function resetLecForm() {
  lecForm.title = "";
  lecForm.instructor = "";
  lecForm.date = "";
  lecForm.time = "";
  lecForm.imageUrl = "";
}

function closeForm() {
  clearMsgs();
  showForm.value = false;
  editingId.value = "";
  selectedKey.value = "";
  resetExForm();
  resetLecForm();
  lecDdOpen.value = false;
}

function openNew(type) {
  clearMsgs();
  showForm.value = true;
  formType.value = type;
  editingId.value = "";
  selectedKey.value = "";
  resetExForm();
  resetLecForm();
  lecDdOpen.value = false;
}

function selectCard(item) {
  clearMsgs();
  selectedKey.value = item.key;
  showForm.value = true;
  formType.value = item.type;
  editingId.value = item.id;
  lecDdOpen.value = false;

  if (item.type === "exhibition") {
    const ex = exhibitionList.value.find((x) => x.id === item.id);
    if (!ex) return setErr("전시 데이터를 찾을 수 없습니다.");

    exForm.title = ex.title || "";
    exForm.artistName = ex.artistName || "";
    exForm.imageUrl = ex.imageUrl || "";
    exForm.startDate = ex.startDate ? tsToDateInput(ex.startDate) : "";
    exForm.endDate = ex.endDate ? tsToDateInput(ex.endDate) : "";
    exForm.lectureIds = Array.isArray(ex.lectureIds) ? ex.lectureIds.filter(Boolean) : [];

    resetLecForm();
    return;
  }

  const lec = lectureList.value.find((x) => x.id === item.id);
  if (!lec) return setErr("특강 데이터를 찾을 수 없습니다.");

  lecForm.title = lec.title || "";
  lecForm.instructor = lec.instructor || "";
  lecForm.imageUrl = lec.imageUrl || "";
  lecForm.date = lec.dateTime ? tsToDateInput(lec.dateTime) : "";
  lecForm.time = lec.dateTime ? tsToTimeInput(lec.dateTime) : "";

  resetExForm();
}

/** 전시에서 연결할 특강 옵션 */
const lectureOptions = computed(() => lectureList.value);

const linkedLectures = computed(() => {
  const ids = new Set((exForm.lectureIds || []).filter(Boolean));
  const map = new Map(lectureList.value.map((l) => [l.id, l]));
  const out = [];
  ids.forEach((id) => {
    const lec = map.get(id);
    if (lec) out.push(lec);
  });
  return out.sort((a, b) => (toMillisMaybe(b.dateTime) || 0) - (toMillisMaybe(a.dateTime) || 0));
});

function unlinkLecture(id) {
  exForm.lectureIds = (exForm.lectureIds || []).filter((x) => x !== id);
}

/** ✅ dropdown open/close */
const lecDdOpen = ref(false);
const lecDdRef = ref(null);

function toggleLecDd() {
  lecDdOpen.value = !lecDdOpen.value;
}
function onDocPointerDown(e) {
  if (!lecDdOpen.value) return;
  const el = lecDdRef.value;
  if (!el) return;
  if (el === e.target || el.contains(e.target)) return;
  lecDdOpen.value = false;
}

onMounted(() => {
  document.addEventListener("pointerdown", onDocPointerDown, true);
});
onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onDocPointerDown, true);
});

/** 드랍다운 버튼 라벨 */
const selectedLectureLabel = computed(() => {
  const n = (exForm.lectureIds || []).filter(Boolean).length;
  if (lectureOptions.value.length === 0) return "등록된 특강 없음";
  if (n <= 0) return "특강 선택";
  return `특강 ${n}개 선택됨`;
});

/** Save enable */
const canSave = computed(() => {
  if (saving.value) return false;
  if (formType.value === "exhibition") return (exForm.title || "").trim().length > 0;
  return (lecForm.title || "").trim().length > 0 && !!lecForm.date;
});

/** bytes estimate */
function safeEstimate(obj) {
  try { return estimateDocBytes(obj); }
  catch {
    try { return estimateDocBytes(JSON.parse(JSON.stringify(obj ?? {}))); }
    catch { return 0; }
  }
}

/** Save */
async function handleSave() {
  clearMsgs();

  if (!canSave.value) {
    setErr(formType.value === "exhibition" ? "전시 제목은 필수입니다." : "특강명/특강 날짜는 필수입니다.");
    return;
  }

  saving.value = true;

  try {
    if (formType.value === "exhibition") {
      const exId = editingId.value;

      const lectureIdsClean = Array.from(
        new Set((exForm.lectureIds || []).map((x) => String(x).trim()).filter(Boolean))
      );

      const payload = {
        title: (exForm.title || "").trim(),
        artistName: (exForm.artistName || "").trim(),
        imageUrl: (exForm.imageUrl || "").trim(),
        startDate: dateToTimestamp(exForm.startDate),
        endDate: dateToTimestamp(exForm.endDate),
        lectureIds: lectureIdsClean,
        updatedAt: serverTimestamp(),
        cardName: deleteField(),
      };

      const payloadForBytes = {
        ...payload,
        updatedAt: null,
        cardName: null,
      };

      const prev = exId ? exhibitionList.value.find((x) => x.id === exId) : null;
      const prevBytes = safeEstimate(prev);
      const nextBytes = safeEstimate(payloadForBytes);

      if (!exId) {
        const created = await addDoc(collection(db, "exhibitions"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        editingId.value = created.id;
        selectedKey.value = `ex:${created.id}`;

        await bumpStorageUsedBytes(nextBytes);
        setOk("저장되었습니다. (전시)");
      } else {
        await setDoc(doc(db, "exhibitions", exId), payload, { merge: true });

        await bumpStorageUsedBytes(nextBytes - prevBytes);
        setOk("저장되었습니다. (전시 수정)");
      }
      return;
    }

    // Lecture
    const lecId = editingId.value;
    const dt = lectureDateTimeToTimestamp(lecForm.date, lecForm.time);

    const payload = {
      title: (lecForm.title || "").trim(),
      instructor: (lecForm.instructor || "").trim(),
      imageUrl: (lecForm.imageUrl || "").trim(),
      dateTime: dt,
      updatedAt: serverTimestamp(),
    };

    const payloadForBytes = { ...payload, updatedAt: null };

    const prev = lecId ? lectureList.value.find((x) => x.id === lecId) : null;
    const prevBytes = safeEstimate(prev);
    const nextBytes = safeEstimate(payloadForBytes);

    if (!lecId) {
      const created = await addDoc(collection(db, "lectures"), {
        ...payload,
        createdAt: serverTimestamp(),
      });
      editingId.value = created.id;
      selectedKey.value = `lec:${created.id}`;

      await bumpStorageUsedBytes(nextBytes);
      setOk("저장되었습니다. (특강)");
    } else {
      await setDoc(doc(db, "lectures", lecId), payload, { merge: true });

      await bumpStorageUsedBytes(nextBytes - prevBytes);
      setOk("저장되었습니다. (특강 수정)");
    }
  } catch (e) {
    setErr(e?.message || "저장 중 오류가 발생했습니다.");
  } finally {
    saving.value = false;
  }
}

/** Delete (real deleteDoc) */
async function handleDelete() {
  clearMsgs();
  if (!editingId.value) return;

  const typeLabel = formType.value === "exhibition" ? "전시" : "특강";
  if (!confirm(`정말 삭제할까요? (${typeLabel} 문서가 Firestore에서 실제 삭제됩니다)`)) return;

  saving.value = true;

  try {
    const id = editingId.value;

    if (formType.value === "exhibition") {
      const prev = exhibitionList.value.find((x) => x.id === id);
      const prevBytes = safeEstimate(prev);

      await deleteDoc(doc(db, "exhibitions", id));
      if (prevBytes > 0) await bumpStorageUsedBytes(-prevBytes);

      closeForm();
      setOk("삭제되었습니다. (전시)");
      return;
    }

    const prev = lectureList.value.find((x) => x.id === id);
    const prevBytes = safeEstimate(prev);

    await deleteDoc(doc(db, "lectures", id));
    if (prevBytes > 0) await bumpStorageUsedBytes(-prevBytes);

    closeForm();
    setOk("삭제되었습니다. (특강)");
  } catch (e) {
    setErr(e?.message || "삭제 중 오류가 발생했습니다.");
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.admin-page { display:flex; flex-direction:column; gap:18px; }

.page-head{ display:flex; flex-direction:column; gap:12px; }
.head-top{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
.home-link{ font-size:12px; color:#777; text-decoration:none; }
.home-link:hover{ color:#111; }

.title{ font-size:18px; font-weight:600; margin:0; }
.desc{ font-size:13px; color:#666; margin:6px 0 0; }
.msg{ margin:10px 0 0; font-size:12px; }
.msg.ok{ color:#0b6b2f; }
.msg.error{ color:#b00020; }

.panel{ border:1px solid rgba(0,0,0,0.08); border-radius:12px; background:#fff; overflow:hidden; }
.panel-head{ padding:14px 14px 10px; border-bottom:1px solid rgba(0,0,0,0.06); }
.panel-title{ font-size:13px; font-weight:600; color:#111; }
.panel-sub{ margin-top:4px; font-size:12px; color:#777; }
.panel-body{ padding:14px; overflow:visible; }

.layout{ display:flex; gap:16px; align-items:flex-start; overflow:visible; }
.list-panel{ flex:1 1 58%; min-width:0; }
.right-col{ flex:1 1 42%; min-width:320px; display:flex; flex-direction:column; gap:14px; overflow:visible; }
.detail-panel{ overflow:visible; }
.side-box{ position:sticky; top:12px; }

.list-wrap{ overflow:auto; -ms-overflow-style:none; scrollbar-width:none; }
.list-wrap::-webkit-scrollbar{ display:none; }

.tabs{ display:flex; gap:8px; margin-bottom:10px; }
.tab{ border:1px solid rgba(0,0,0,0.10); background:#fff; border-radius:999px; padding:8px 10px; font-size:12px; cursor:pointer; }
.tab:hover{ background:rgba(0,0,0,0.03); }
.tab.active{ background:#111; color:#fff; border-color:rgba(0,0,0,0.12); }

.search-row{ margin-bottom:12px; }
.search{ width:100%; box-sizing:border-box; border:1px solid rgba(0,0,0,0.12); border-radius:10px; padding:10px 12px; font-size:12px; outline:none; }
.search:focus{ border-color:rgba(0,0,0,0.22); }

.pager{ display:flex; align-items:center; justify-content:space-between; gap:10px; margin:0 0 12px; padding:10px 10px; border:1px solid rgba(0,0,0,0.06); border-radius:12px; background:rgba(0,0,0,0.02); }
.pager-text{ font-size:12px; color:#666; }
.pager-right{ display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; }
.pbtn{ border:1px solid rgba(0,0,0,0.12); background:#fff; border-radius:10px; padding:8px 10px; font-size:12px; cursor:pointer; }
.pbtn:hover{ background:rgba(0,0,0,0.03); }
.pbtn:disabled{ opacity:0.55; cursor:not-allowed; }
.pbtn.num{ min-width:40px; text-align:center; }
.pbtn.active{ background:#111; color:#fff; border-color:rgba(0,0,0,0.12); }

.list{ display:grid; gap:10px; }
.list-item{ width:100%; text-align:left; border:1px solid rgba(0,0,0,0.08); border-radius:12px; background:#fff; padding:12px; cursor:pointer; }
.list-item:hover{ background:rgba(0,0,0,0.02); }
.list-item.active{ border-color:rgba(0,0,0,0.18); background:rgba(0,0,0,0.03); }
.list-item.row{ display:grid; grid-template-columns:76px 1fr; gap:12px; align-items:center; }

.thumb{ width:76px; height:76px; border-radius:12px; overflow:hidden; border:1px solid rgba(0,0,0,0.08); background:rgba(0,0,0,0.03); }
.thumb img{ width:100%; height:100%; object-fit:cover; display:block; }
.thumb-ph{ width:100%; height:100%; background:linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02)); }

.li-main{ min-width:0; }
.li-title{ font-size:13px; font-weight:600; margin-bottom:6px; }
.li-meta{ font-size:12px; color:#666; }
.li-badges{ margin-top:8px; display:flex; gap:6px; flex-wrap:wrap; }

.badge{ display:inline-flex; align-items:center; height:22px; padding:0 8px; border-radius:999px; border:1px solid rgba(0,0,0,0.10); font-size:11px; color:#333; background:rgba(0,0,0,0.03); }
.badge.ghost{ background:transparent; color:#777; }
.empty{ padding:14px 6px 6px; font-size:12px; color:#777; }
.dot{ margin:0 6px; color:#999; }

.grid{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:12px; }
.field{ display:flex; flex-direction:column; gap:6px; }
.field.wide{ grid-column:1 / -1; }
.label{ font-size:12px; color:#666; }
.input{ border:1px solid rgba(0,0,0,0.12); border-radius:10px; padding:10px 12px; font-size:12px; outline:none; background:#fff; }
.input:focus{ border-color:rgba(0,0,0,0.22); }
.divider{ height:1px; background:rgba(0,0,0,0.06); margin:14px 0; }

.actions{ display:flex; gap:8px; justify-content:flex-end; flex-wrap:wrap; }
.btn{ border:1px solid rgba(0,0,0,0.12); background:#fff; border-radius:10px; padding:10px 12px; font-size:12px; cursor:pointer; }
.btn:hover{ background:rgba(0,0,0,0.03); }
.btn:disabled{ opacity:0.6; cursor:not-allowed; }
.btn.primary{ background:#111; color:#fff; border-color:rgba(0,0,0,0.12); }
.btn.primary:hover{ background:#000; }
.btn.danger{ border-color:rgba(176,0,32,0.22); color:#b00020; }
.btn.danger:hover{ background:rgba(176,0,32,0.06); }
.btn.subtle{ padding:8px 10px; border-radius:9px; }

.empty-state{ border:1px dashed rgba(0,0,0,0.14); border-radius:12px; padding:14px; background:rgba(0,0,0,0.02); }
.empty-title{ font-size:13px; font-weight:700; }
.empty-desc{ margin-top:6px; font-size:12px; color:#666; }
.empty-actions{ margin-top:12px; display:flex; gap:8px; flex-wrap:wrap; }

.link-box{ border:1px solid rgba(0,0,0,0.08); border-radius:12px; padding:12px; background: rgba(0,0,0,0.02); position:relative; z-index:1; }
.link-head{ display:flex; align-items:flex-start; justify-content:space-between; gap:10px; margin-bottom:10px; }
.link-title{ font-size:13px; font-weight:700; }
.link-sub{ margin-top:4px; font-size:12px; color:#777; } /* ✅ 스타일 복구 */

.dd{ position:relative; z-index:999999; }
.dd-btn{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  border:1px solid rgba(0,0,0,0.12);
  background:#fff;
  border-radius:12px;
  padding:10px 12px;
  font-size:12px;
  cursor:pointer;
}
.dd-btn:hover{ background:rgba(0,0,0,0.02); }
.dd-btn:disabled{ opacity:0.6; cursor:not-allowed; }
.dd-btn.open{ border-color:rgba(0,0,0,0.22); }
.dd-btn-text{ color:#111; }
.dd-caret{ color:#777; }

.dd-menu{
  position:absolute;
  left:0; right:0;
  top:calc(100% + 8px);
  z-index:9999999;
  border:1px solid rgba(0,0,0,0.10);
  border-radius:12px;
  background:#fff;
  overflow:auto;
  box-shadow:0 18px 40px rgba(0,0,0,0.12);
  max-height:520px;
  min-height:180px;
}

.dd-item{
  display:flex;
  gap:10px;
  align-items:flex-start;
  padding:10px 12px;
  cursor:pointer;
}
.dd-item:hover{ background:rgba(0,0,0,0.02); }
.dd-check{ margin-top:2px; }
.dd-item-text{ display:flex; flex-direction:column; gap:4px; min-width:0; }
.dd-title{ font-size:12px; }
.dd-meta{ font-size:12px; color:#666; }

.empty-mini{ padding:10px 12px; font-size:12px; color:#777; }

.linked-preview{ margin-top:12px; border-top:1px solid rgba(0,0,0,0.06); padding-top:12px; }
.lp-title{ font-size:12px; color:#777; margin-bottom:8px; }
.lp-list{ display:grid; gap:8px; }
.lp-item{
  display:flex; align-items:center; justify-content:space-between; gap:10px;
  padding:10px; border:1px solid rgba(0,0,0,0.06); border-radius:12px; background:#fff;
}
.lp-left{ min-width:0; }
.lp-name{ font-size:12px; font-weight:700; }
.lp-meta{ margin-top:4px; font-size:12px; color:#666; }

@media (max-width: 980px){
  .layout{ flex-direction:column; }
  .right-col{ min-width:0; }
  .side-box{ position:static; }
  .grid{ grid-template-columns:1fr; }
  .list-item.row{ grid-template-columns:64px 1fr; }
  .thumb{ width:64px; height:64px; }
  .pager{ flex-direction:column; align-items:flex-start; }
  .pager-right{ width:100%; justify-content:flex-start; }
  .dd-menu{ max-height:420px; }
}
</style>
