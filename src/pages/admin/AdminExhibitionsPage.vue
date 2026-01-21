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

    <section class="layout">
      <!-- LEFT: 전시 목록/검색 -->
      <aside class="panel list-panel">
        <div class="panel-head">
          <div class="panel-title">전시 목록</div>
          <div class="panel-sub">검색 후 선택하여 수정</div>
        </div>

        <div class="panel-body">
          <input
            v-model="q"
            class="search"
            type="text"
            placeholder="전시 제목/작가/카드 이름 검색"
          />

          <div class="list">
            <button
              v-for="item in filtered"
              :key="item.id"
              type="button"
              class="list-item"
              :class="{ active: selectedId === item.id }"
              @click="select(item.id)"
            >
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

      <!-- RIGHT: 전시 폼 -->
      <main class="panel form-panel">
        <div class="panel-head">
          <div class="panel-title">전시 정보</div>
          <div class="panel-sub">필수 항목부터 입력하세요</div>
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
    </section>
  </section>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onBeforeUnmount } from "vue";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
  writeBatch,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const qText = ref("");
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

  // 연결용(내부)
  lectureId: "",
});

const lecture = reactive({
  title: "",
  instructor: "",
  date: "",
  time: "",
  imageUrl: "",
});

const canSave = computed(() => (form.title || "").trim().length > 0);

function clearMsgs() {
  errorMsg.value = "";
  okMsg.value = "";
}
function setOk(msg) {
  okMsg.value = msg;
  errorMsg.value = "";
  // 3초 후 메시지 자동 제거
  setTimeout(() => {
    if (okMsg.value === msg) okMsg.value = "";
  }, 3000);
}
function setErr(msg) {
  errorMsg.value = msg;
  okMsg.value = "";
}

function dateToTimestamp(dateStr) {
  // dateStr: "YYYY-MM-DD"
  if (!dateStr) return null;
  // 로컬 기준 00:00:00 (운영상 충분)
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

/** 목록 데이터 */
const exhibitions = ref([]);

/** 목록 구독(onSnapshot) */
let unsubEx = null;

onMounted(() => {
  // 최신 생성순
  const exQ = query(collection(db, "exhibitions"), orderBy("createdAt", "desc"));

  unsubEx = onSnapshot(
    exQ,
    (snap) => {
      const arr = snap.docs.map((d) => {
        const data = d.data() || {};
        const sd = data.startDate ? tsToDateInput(data.startDate) : "";
        const ed = data.endDate ? tsToDateInput(data.endDate) : "";
        const periodText = sd && ed ? `${sd} ~ ${ed}` : (sd || ed || "-");
        return {
          id: d.id,
          title: data.title || "",
          artistName: data.artistName || "",
          cardName: data.cardName || "",
          imageUrl: data.imageUrl || "",
          hasLecture: !!data.hasLecture,
          lectureId: data.lectureId || "",
          startDate: data.startDate || null,
          endDate: data.endDate || null,
          periodText,
        };
      });

      exhibitions.value = arr;
      loading.value = false;
    },
    (err) => {
      loading.value = false;
      setErr(err?.message || "전시 목록을 불러오지 못했습니다.");
    }
  );
});

onBeforeUnmount(() => {
  if (unsubEx) unsubEx();
});

/** 검색 */
const filtered = computed(() => {
  const s = (qText.value || "").trim().toLowerCase();
  if (!s) return exhibitions.value;

  return exhibitions.value.filter((x) => {
    return (
      (x.title || "").toLowerCase().includes(s) ||
      (x.artistName || "").toLowerCase().includes(s) ||
      (x.cardName || "").toLowerCase().includes(s) ||
      (x.periodText || "").toLowerCase().includes(s)
    );
  });
});

/** 선택 */
async function select(id) {
  clearMsgs();
  selectedId.value = id;

  try {
    const exRef = doc(db, "exhibitions", id);
    const exSnap = await getDoc(exRef);
    if (!exSnap.exists()) {
      setErr("전시 데이터를 찾을 수 없습니다.");
      return;
    }

    const data = exSnap.data() || {};

    form.title = data.title || "";
    form.artistName = data.artistName || "";
    form.cardName = data.cardName || "";
    form.imageUrl = data.imageUrl || "";
    form.startDate = data.startDate ? tsToDateInput(data.startDate) : "";
    form.endDate = data.endDate ? tsToDateInput(data.endDate) : "";

    form.hasLecture = !!data.hasLecture;
    form.lectureId = data.lectureId || "";

    // 특강이 있으면 lecture 문서도 로드
    lecture.title = "";
    lecture.instructor = "";
    lecture.date = "";
    lecture.time = "";
    lecture.imageUrl = "";

    if (form.hasLecture) {
      // 1) lectureId가 있으면 그걸로 로드
      if (form.lectureId) {
        const lecRef = doc(db, "lectures", form.lectureId);
        const lecSnap = await getDoc(lecRef);
        if (lecSnap.exists()) {
          const ld = lecSnap.data() || {};
          lecture.title = ld.title || "";
          lecture.instructor = ld.instructor || "";
          lecture.imageUrl = ld.imageUrl || "";
          lecture.date = ld.dateTime ? tsToDateInput(ld.dateTime) : "";
          lecture.time = ld.dateTime ? tsToTimeInput(ld.dateTime) : "";
        }
      } else {
        // 2) 안전망: exhibitionId로 검색
        const lecQ = query(collection(db, "lectures"), where("exhibitionId", "==", id));
        const lecSnap = await getDocs(lecQ);
        const first = lecSnap.docs[0];
        if (first) {
          form.lectureId = first.id;
          const ld = first.data() || {};
          lecture.title = ld.title || "";
          lecture.instructor = ld.instructor || "";
          lecture.imageUrl = ld.imageUrl || "";
          lecture.date = ld.dateTime ? tsToDateInput(ld.dateTime) : "";
          lecture.time = ld.dateTime ? tsToTimeInput(ld.dateTime) : "";
        }
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

/** 저장 */
async function handleSave() {
  clearMsgs();

  if (!canSave.value) {
    setErr("전시 제목은 필수입니다.");
    return;
  }

  // 특강 토글 ON이면 최소값 체크(운영 안정)
  if (form.hasLecture) {
    if (!(lecture.title || "").trim()) {
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
    const exPayload = {
      title: (form.title || "").trim(),
      artistName: (form.artistName || "").trim(),
      cardName: (form.cardName || "").trim(),
      imageUrl: (form.imageUrl || "").trim(),
      startDate: dateToTimestamp(form.startDate),
      endDate: dateToTimestamp(form.endDate),
      hasLecture: !!form.hasLecture,
      updatedAt: serverTimestamp(),
    };

    // 신규/수정
    let exId = selectedId.value;

    if (!exId) {
      const created = await addDoc(collection(db, "exhibitions"), {
        ...exPayload,
        createdAt: serverTimestamp(),
      });
      exId = created.id;
      selectedId.value = exId;
    } else {
      await updateDoc(doc(db, "exhibitions", exId), exPayload);
    }

    // 특강 처리
    if (form.hasLecture) {
      const dt = lectureDateTimeToTimestamp(lecture.date, lecture.time);

      const lecPayload = {
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

        // 전시에 lectureId 저장(목록 표시/로드 최적화)
        await updateDoc(doc(db, "exhibitions", exId), {
          lectureId: lecId,
          hasLecture: true,
        });
      } else {
        await updateDoc(doc(db, "lectures", lecId), lecPayload);
        await updateDoc(doc(db, "exhibitions", exId), {
          hasLecture: true,
          lectureId: lecId,
        });
      }
    } else {
      // 특강 토글 OFF인 경우: 연결된 특강이 있으면 삭제(원하면 유지로 바꿀 수도 있음)
      if (form.lectureId) {
        await deleteDoc(doc(db, "lectures", form.lectureId));
        form.lectureId = "";
      }
      await updateDoc(doc(db, "exhibitions", exId), {
        hasLecture: false,
        lectureId: "",
      });
    }

    setOk("저장되었습니다.");
  } catch (e) {
    setErr(e?.message || "저장 중 오류가 발생했습니다.");
  } finally {
    saving.value = false;
  }
}

/** 삭제 (전시 삭제 + 연결된 특강도 같이 삭제) */
async function handleDelete() {
  clearMsgs();

  const exId = selectedId.value;
  if (!exId) return;

  if (!confirm("정말 삭제할까요? (연결된 특강도 함께 삭제됩니다)")) return;

  saving.value = true;

  try {
    const batch = writeBatch(db);

    // 전시 문서
    batch.delete(doc(db, "exhibitions", exId));

    // 1) 전시에 저장된 lectureId가 있으면 삭제
    if (form.lectureId) {
      batch.delete(doc(db, "lectures", form.lectureId));
    }

    // 2) 안전망: exhibitionId로 연결된 특강 전부 삭제
    const lecQ = query(collection(db, "lectures"), where("exhibitionId", "==", exId));
    const lecSnap = await getDocs(lecQ);
    lecSnap.forEach((d) => batch.delete(doc(db, "lectures", d.id)));

    await batch.commit();

    resetForm();
    setOk("삭제되었습니다.");
  } catch (e) {
    setErr(e?.message || "삭제 중 오류가 발생했습니다.");
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

/* Layout */
.layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 18px;
  align-items: start;
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

/* List */
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
  margin-top: 12px;
  display: grid;
  gap: 8px;
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
  .layout { grid-template-columns: 1fr; }
  .list-panel { order: 2; }
  .form-panel { order: 1; }
  .grid { grid-template-columns: 1fr; }
}
</style>
