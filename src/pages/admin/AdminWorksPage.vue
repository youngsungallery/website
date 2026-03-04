<template>
  <section class="admin-page">
    <header class="page-head">
      <RouterLink to="/admin" class="home-link">← 관리자 홈</RouterLink>

      <div class="head-row">
        <h2 class="title">작품 관리</h2>
        <button class="btn primary" type="button" @click="openCreate">
          + 작품 등록
        </button>
      </div>

      <p class="desc">작품 등록 및 상태 관리 기능을 여기에 연결합니다.</p>
    </header>

    <!-- 상단 컨트롤 바 -->
    <section class="panel">
      <div class="controls">
        <div class="control-left">
          <label class="field">
            <span class="label">검색</span>
            <input
              v-model="ui.q"
              class="input"
              placeholder="작품명 / 작가명 / 태그 / 코드(ID)"
              type="text"
            />
          </label>

          <label class="field">
            <span class="label">정렬</span>
            <select v-model="ui.sort" class="select">
              <option value="updated_desc">최근 수정</option>
              <option value="created_desc">최근 등록</option>
              <option value="title_asc">작품명(가나다)</option>
              <option value="artist_asc">작가명(가나다)</option>
              <option value="code_asc">코드(ID)</option>
            </select>
          </label>

          <label class="check">
            <input v-model="ui.showDeleted" type="checkbox" />
            삭제 포함
          </label>

          <label class="check">
            <input v-model="ui.onlyFeatured" type="checkbox" />
            대표만
          </label>
        </div>

        <div class="control-right">
          <button class="btn ghost" type="button" @click="resetFilters">초기화</button>
          <button class="btn" type="button" @click="reloadMock">새로고침</button>
        </div>
      </div>
    </section>

    <!-- 요약 -->
    <section class="stats">
      <div class="stat">
        <div class="k">전체</div>
        <div class="v">{{ stats.total }}</div>
      </div>
      <div class="stat">
        <div class="k">정상</div>
        <div class="v">{{ stats.active }}</div>
      </div>
      <div class="stat">
        <div class="k">삭제</div>
        <div class="v">{{ stats.deleted }}</div>
      </div>
      <div class="stat">
        <div class="k">대표</div>
        <div class="v">{{ stats.featured }}</div>
      </div>
    </section>

    <!-- 본문 2열 레이아웃 -->
    <section class="content-grid">
      <!-- 목록 -->
      <section class="panel list-panel">
        <div class="panel-head">
          <div class="panel-title">작품 목록</div>
          <div class="panel-sub">초기 레이아웃 · 코드(ID)는 이미지 파일명 기반</div>
        </div>

        <div class="table">
          <div class="thead">
            <div>이미지</div>
            <div>작품</div>
            <div class="hide-sm">정보</div>
            <div>상태</div>
            <div class="right">액션</div>
          </div>

          <div v-if="filteredItems.length === 0" class="empty">
            아직 등록된 작품이 없어요. 우측 상단에서 작품을 등록해줘 🙂
          </div>

          <div v-else class="tbody">
            <button
              v-for="a in filteredItems"
              :key="a.id"
              type="button"
              class="row"
              :class="{ selected: selected?.id === a.id }"
              @click="select(a)"
            >
              <div class="cell">
                <div class="thumb">
                  <img
                    v-if="a.imageUrl"
                    :src="a.imageUrl"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div v-else class="thumb-ph">NO IMAGE</div>
                </div>
              </div>

              <div class="cell">
                <div class="topline">
                  <div class="name">{{ a.title || "(제목 없음)" }}</div>
                  <span class="code">{{ artworkCode(a) || "—" }}</span>
                </div>

                <div class="sub">{{ a.artist || "(작가 미상)" }}</div>

                <div v-if="a.tags?.length" class="tags">#{{ a.tags.join(" #") }}</div>
                <div v-else class="tags muted">태그 없음</div>
              </div>

              <div class="cell hide-sm">
                <div class="meta">
                  <span v-if="a.year" class="pill">{{ a.year }}</span>
                  <span v-if="a.medium" class="pill">{{ a.medium }}</span>
                  <span v-if="a.size" class="pill">{{ a.size }}</span>
                  <span v-if="a.imageFileName" class="pill subtle">
                    {{ a.imageFileName }}
                  </span>
                </div>
              </div>

              <div class="cell">
                <span v-if="a.deleted" class="badge bad">삭제됨</span>
                <span v-else class="badge ok">정상</span>
                <span v-if="a.isFeatured" class="badge feat">대표</span>
              </div>

              <div class="cell right">
                <span class="mini-actions">
                  <button class="btn tiny ghost" type="button" @click.stop="openEdit(a)">
                    수정
                  </button>
                  <button
                    v-if="!a.deleted"
                    class="btn tiny danger"
                    type="button"
                    @click.stop="mockDelete(a)"
                  >
                    삭제
                  </button>
                  <button
                    v-else
                    class="btn tiny"
                    type="button"
                    @click.stop="mockRestore(a)"
                  >
                    복원
                  </button>
                </span>
              </div>
            </button>
          </div>
        </div>

        <div class="pager">
          <button class="btn ghost" type="button" disabled>이전</button>
          <button class="btn ghost" type="button" disabled>다음</button>
        </div>
      </section>

      <!-- 상세/편집 자리 -->
      <aside class="panel side-panel">
        <div class="panel-head">
          <div class="panel-title">선택된 작품</div>
          <div class="panel-sub">여기에 상세/연결 설정 UI를 붙일 예정</div>
        </div>

        <div v-if="!selected" class="side-empty">
          목록에서 작품을 선택하면 여기에 정보가 표시돼.
        </div>

        <div v-else class="side-body">
          <div class="side-thumb">
            <img v-if="selected.imageUrl" :src="selected.imageUrl" alt="" decoding="async" />
            <div v-else class="side-thumb-ph">NO IMAGE</div>
          </div>

          <div class="side-title-row">
            <div class="side-title">{{ selected.title || "(제목 없음)" }}</div>
            <div class="side-code">{{ artworkCode(selected) || "—" }}</div>
          </div>

          <div class="side-artist">{{ selected.artist || "(작가 미상)" }}</div>

          <div class="side-meta">
            <div class="kv"><span>이미지 파일명</span><b>{{ selected.imageFileName || "—" }}</b></div>
            <div class="kv"><span>연도</span><b>{{ selected.year || "—" }}</b></div>
            <div class="kv"><span>기법</span><b>{{ selected.medium || "—" }}</b></div>
            <div class="kv"><span>크기</span><b>{{ selected.size || "—" }}</b></div>
          </div>

          <div class="side-actions">
            <button class="btn" type="button" @click="openEdit(selected)">수정</button>
            <button class="btn ghost" type="button" @click="selected = null">선택 해제</button>
          </div>
        </div>
      </aside>
    </section>

    <!-- 모달(레이아웃만) -->
    <div v-if="modal.open" class="modal-backdrop" @click.self="closeModal">
      <div class="modal">
        <div class="mhead">
          <div class="mtitle">
            {{ modal.mode === "create" ? "작품 등록" : "작품 수정" }}
          </div>
          <button class="x" type="button" @click="closeModal">×</button>
        </div>

        <div class="mgrid">
          <!-- ✅ 코드(ID) 표시: 이미지 파일명 기반 -->
          <label class="field wide">
            <span class="label">코드(ID) · 이미지 파일명 기반</span>
            <input class="input" :value="computedCodePreview" readonly />
            <p class="help">이미지 파일명에서 확장자를 뺀 값이 사이트 ID로 표시됩니다.</p>
          </label>

          <label class="field">
            <span class="label">작품명</span>
            <input v-model="form.title" class="input" />
          </label>

          <label class="field">
            <span class="label">작가명</span>
            <input v-model="form.artist" class="input" />
          </label>

          <label class="field">
            <span class="label">연도</span>
            <input v-model="form.year" class="input" placeholder="예: 1998 / 미상" />
          </label>

          <label class="field">
            <span class="label">기법/재료</span>
            <input v-model="form.medium" class="input" placeholder="예: 판화, 유화…" />
          </label>

          <label class="field">
            <span class="label">크기</span>
            <input v-model="form.size" class="input" placeholder="예: 60×80cm" />
          </label>

          <label class="field">
            <span class="label">이미지 파일명(예: YS01.png)</span>
            <input v-model="form.imageFileName" class="input" placeholder="YS01.png" />
          </label>

          <label class="field">
            <span class="label">이미지 URL</span>
            <input v-model="form.imageUrl" class="input" placeholder="https://..." />
          </label>

          <label class="field wide">
            <span class="label">태그(쉼표로 구분)</span>
            <input v-model="form.tagsText" class="input" placeholder="예: 판화, 신작, 초대전" />
          </label>

          <label class="field wide">
            <span class="label">설명</span>
            <textarea v-model="form.description" class="textarea" rows="5" />
          </label>

          <label class="check wide">
            <input v-model="form.isFeatured" type="checkbox" />
            대표 작품 표시
          </label>
        </div>

        <div class="mfoot">
          <button class="btn ghost" type="button" @click="closeModal">취소</button>
          <button class="btn primary" type="button" @click="mockSave">저장(임시)</button>
        </div>

        <p class="hint">※ 지금은 레이아웃만 적용. 저장/로드는 다음 단계에서 연결해요.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from "vue";

/** UI 상태(레이아웃만) */
const ui = reactive({
  q: "",
  sort: "updated_desc",
  showDeleted: false,
  onlyFeatured: false,
});

/** 임시 데이터(레이아웃 확인용) */
const items = ref([
  {
    id: "a1",
    title: "무제",
    artist: "김환기",
    year: "1971",
    medium: "판화",
    size: "56×76cm",
    imageUrl: "",
    imageFileName: "YS01.png",
    tags: ["판화", "블루"],
    isFeatured: true,
    deleted: false,
    createdAtMs: 1710000000000,
    updatedAtMs: 1715000000000,
  },
  {
    id: "a2",
    title: "풍경",
    artist: "박수근",
    year: "미상",
    medium: "드로잉",
    size: "",
    imageUrl: "",
    imageFileName: "YS25.png",
    tags: ["드로잉"],
    isFeatured: false,
    deleted: false,
    createdAtMs: 1711000000000,
    updatedAtMs: 1712000000000,
  },
  {
    id: "a3",
    title: "비공식 샘플",
    artist: "작가 미상",
    year: "",
    medium: "",
    size: "",
    imageUrl: "",
    imageFileName: "TEMP_TEST_01.png",
    tags: ["임시"],
    isFeatured: false,
    deleted: true,
    createdAtMs: 1710500000000,
    updatedAtMs: 1710600000000,
  },
]);

const selected = ref(null);

const stats = computed(() => {
  const all = items.value.length;
  const del = items.value.filter((x) => x.deleted).length;
  const feat = items.value.filter((x) => x.isFeatured && !x.deleted).length;
  return { total: all, deleted: del, active: all - del, featured: feat };
});

/** ✅ 코드(ID): 이미지 파일명에서 확장자 제거 */
function codeFromFileName(imageFileName) {
  const v = String(imageFileName || "").trim();
  if (!v) return "";
  return v.replace(/\.[^/.]+$/, ""); // 마지막 확장자 제거
}
function artworkCode(a) {
  return codeFromFileName(a?.imageFileName);
}

/** 검색/정렬(초기용: 클라에서만) */
const filteredItems = computed(() => {
  let list = [...items.value];

  // filters
  if (!ui.showDeleted) list = list.filter((x) => !x.deleted);
  if (ui.onlyFeatured) list = list.filter((x) => x.isFeatured && !x.deleted);

  // search
  const kw = ui.q.trim().toLowerCase();
  if (kw) {
    list = list.filter((a) => {
      const code = artworkCode(a).toLowerCase();
      const t = String(a.title || "").toLowerCase();
      const ar = String(a.artist || "").toLowerCase();
      const tags = Array.isArray(a.tags) ? a.tags.join(" ").toLowerCase() : "";
      return code.includes(kw) || t.includes(kw) || ar.includes(kw) || tags.includes(kw);
    });
  }

  // sort
  switch (ui.sort) {
    case "created_desc":
      list.sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0));
      break;
    case "title_asc":
      list.sort((a, b) => String(a.title || "").localeCompare(String(b.title || ""), "ko"));
      break;
    case "artist_asc":
      list.sort((a, b) => String(a.artist || "").localeCompare(String(b.artist || ""), "ko"));
      break;
    case "code_asc":
      list.sort((a, b) => String(artworkCode(a)).localeCompare(String(artworkCode(b)), "en"));
      break;
    case "updated_desc":
    default:
      list.sort((a, b) => (b.updatedAtMs || 0) - (a.updatedAtMs || 0));
      break;
  }

  return list;
});

/** 모달/폼(레이아웃만) */
const modal = reactive({ open: false, mode: "create" });
const form = reactive({
  id: "",
  title: "",
  artist: "",
  year: "",
  medium: "",
  size: "",
  imageUrl: "",
  imageFileName: "",
  tagsText: "",
  description: "",
  isFeatured: false,
});

const computedCodePreview = computed(() => codeFromFileName(form.imageFileName) || "—");

function resetFilters() {
  ui.q = "";
  ui.sort = "updated_desc";
  ui.showDeleted = false;
  ui.onlyFeatured = false;
}

function reloadMock() {
  // 레이아웃 단계라서 동작 없음
}

function select(a) {
  selected.value = a;
}

function openCreate() {
  modal.open = true;
  modal.mode = "create";
  form.id = "";
  form.title = "";
  form.artist = "";
  form.year = "";
  form.medium = "";
  form.size = "";
  form.imageUrl = "";
  form.imageFileName = "";
  form.tagsText = "";
  form.description = "";
  form.isFeatured = false;
}

function openEdit(a) {
  modal.open = true;
  modal.mode = "edit";
  form.id = a.id;
  form.title = a.title || "";
  form.artist = a.artist || "";
  form.year = a.year || "";
  form.medium = a.medium || "";
  form.size = a.size || "";
  form.imageUrl = a.imageUrl || "";
  form.imageFileName = a.imageFileName || "";
  form.tagsText = (a.tags || []).join(", ");
  form.description = a.description || "";
  form.isFeatured = !!a.isFeatured;
}

function closeModal() {
  modal.open = false;
}

function mockSave() {
  // 레이아웃 단계: 저장 없음
  closeModal();
}

function mockDelete(a) {
  a.deleted = true;
  if (selected.value?.id === a.id) selected.value = { ...a };
}

function mockRestore(a) {
  a.deleted = false;
  if (selected.value?.id === a.id) selected.value = { ...a };
}
</script>

<style scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-head {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.home-link {
  font-size: 12px;
  color: #777;
  text-decoration: none;
}
.home-link:hover {
  color: #111;
}

.head-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.title {
  font-size: 18px;
  font-weight: 700;
}

.desc {
  font-size: 13px;
  color: #666;
}

/* panels */
.panel {
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: #fff;
  border-radius: 16px;
  padding: 14px;
}

.panel-head {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
}

.panel-title {
  font-size: 13px;
  font-weight: 800;
  color: #111;
}
.panel-sub {
  font-size: 12px;
  color: #777;
}

/* controls */
.controls {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  align-items: flex-end;
}

.control-left {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: flex-end;
}
.control-right {
  display: flex;
  gap: 8px;
  align-items: center;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 180px;
}
.label {
  font-size: 12px;
  font-weight: 700;
  color: #333;
}

.input,
.select,
.textarea {
  border: 1px solid rgba(0, 0, 0, 0.10);
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 13px;
  background: #fff;
}

.textarea {
  width: 100%;
  resize: vertical;
}

.check {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  color: #444;
  padding: 10px 0;
}

/* buttons */
.btn {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 800;
  background: #fff;
  cursor: pointer;
}
.btn:hover {
  border-color: rgba(0, 0, 0, 0.18);
}
.btn.ghost {
  background: rgba(0, 0, 0, 0.03);
}
.btn.primary {
  border-color: rgba(0, 0, 0, 0.18);
  background: #111;
  color: #fff;
}
.btn.primary:hover {
  filter: brightness(1.05);
}
.btn.danger {
  border-color: rgba(176, 0, 32, 0.35);
}

.btn.tiny {
  padding: 8px 10px;
  font-size: 12px;
  border-radius: 10px;
}

/* stats */
.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}
.stat {
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  background: #fff;
  padding: 12px 14px;
}
.k {
  font-size: 12px;
  color: #777;
  font-weight: 700;
}
.v {
  margin-top: 6px;
  font-size: 18px;
  font-weight: 900;
  color: #111;
}

/* layout */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 12px;
  align-items: start;
}
@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

/* table */
.table {
  border-radius: 14px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.015);
}

.thead,
.row {
  display: grid;
  grid-template-columns: 90px 1.2fr 1.4fr 0.7fr 170px;
  gap: 12px;
  align-items: center;
  padding: 12px;
}

.thead {
  background: rgba(0, 0, 0, 0.03);
  font-size: 12px;
  font-weight: 900;
}

.tbody .row {
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  background: #fff;
  width: 100%;
  text-align: left;
}

/* ✅ 검정 라인 제거: outline 없음, 배경만 */
.row {
  border: 0;
  outline: none;
}
.row:hover {
  background: rgba(0, 0, 0, 0.02);
}
.row.selected {
  background: rgba(0, 0, 0, 0.035);
}

.cell.right {
  display: flex;
  justify-content: flex-end;
}
.mini-actions {
  display: inline-flex;
  gap: 8px;
}

.thumb {
  width: 72px;
  height: 72px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(0, 0, 0, 0.03);
  display: grid;
  place-items: center;
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb-ph {
  font-size: 10px;
  font-weight: 900;
  color: #666;
}

.topline {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}
.name {
  font-size: 13px;
  font-weight: 900;
  color: #111;
}
.code {
  font-size: 12px;
  font-weight: 900;
  color: #111;
  opacity: 0.75;
  font-variant-numeric: tabular-nums;
}

.sub {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.tags {
  margin-top: 6px;
  font-size: 12px;
  color: #777;
}
.tags.muted {
  opacity: 0.6;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.pill {
  font-size: 11px;
  padding: 6px 8px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: #333;
}
.pill.subtle {
  opacity: 0.85;
}

.badge {
  display: inline-flex;
  font-size: 11px;
  font-weight: 900;
  padding: 6px 8px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(0, 0, 0, 0.03);
  margin-right: 6px;
}
.badge.bad {
  border-color: rgba(176, 0, 32, 0.35);
}
.badge.feat {
  border-color: rgba(0, 0, 0, 0.14);
}

.empty {
  padding: 16px;
  font-size: 12px;
  color: #666;
  background: #fff;
}

/* pager */
.pager {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

/* side panel */
.side-panel {
  position: sticky;
  top: 12px;
}
.side-empty {
  font-size: 12px;
  color: #666;
  padding: 8px 2px;
}
.side-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.side-thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(0, 0, 0, 0.03);
  display: grid;
  place-items: center;
}
.side-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.side-thumb-ph {
  font-size: 11px;
  font-weight: 900;
  color: #666;
}

.side-title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}
.side-title {
  font-size: 14px;
  font-weight: 900;
  color: #111;
}
.side-code {
  font-size: 12px;
  font-weight: 900;
  opacity: 0.75;
  font-variant-numeric: tabular-nums;
}
.side-artist {
  font-size: 12px;
  color: #666;
}

.side-meta {
  display: grid;
  gap: 8px;
  margin-top: 2px;
}
.kv {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;
  color: #555;
}
.kv b {
  color: #111;
}

.side-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

/* responsive */
@media (max-width: 900px) {
  .thead,
  .row {
    grid-template-columns: 90px 1fr 0.7fr 170px;
  }
  .hide-sm {
    display: none;
  }
}
@media (max-width: 560px) {
  .head-row {
    flex-direction: column;
    align-items: stretch;
  }
  .field {
    min-width: 0;
    width: 100%;
  }
  .controls {
    align-items: stretch;
  }
  .control-right {
    justify-content: flex-end;
  }
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .thead,
  .row {
    grid-template-columns: 90px 1fr;
  }
  .cell.right {
    justify-content: flex-start;
  }
}

/* modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 50;
}
.modal {
  width: min(760px, 100%);
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.mhead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.mtitle {
  font-weight: 900;
}
.x {
  border: 0;
  background: transparent;
  font-size: 22px;
  cursor: pointer;
}
.mgrid {
  padding: 14px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.wide {
  grid-column: 1 / -1;
}
.mfoot {
  padding: 14px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
.hint {
  padding: 0 16px 14px;
  margin: 0;
  font-size: 12px;
  color: #777;
}
.help {
  margin: 6px 0 0;
  font-size: 12px;
  color: #777;
}

@media (max-width: 720px) {
  .mgrid {
    grid-template-columns: 1fr;
  }
}
</style>