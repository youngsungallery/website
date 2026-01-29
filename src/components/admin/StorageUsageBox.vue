<!-- FILE: src/components/admin/StorageUsageBox.vue -->
<template>
  <aside class="storage-box" :aria-label="ariaLabel">
    <div class="storage-top">
      <div class="storage-title">{{ title }}</div>

      <div class="storage-actions">
        <button
          v-if="showRefresh"
          type="button"
          class="storage-btn"
          :disabled="loading"
          @click="reloadOnce"
          :title="refreshTitle"
        >
          {{ refreshText }}
        </button>

        <button
          v-if="showInit"
          type="button"
          class="storage-btn primary"
          :disabled="loading || initBusy"
          @click="initDoc"
          :title="initTitle"
        >
          {{ initBusy ? initBusyText : initText }}
        </button>
      </div>
    </div>

    <div class="storage-main">
      <div v-if="loading" class="storage-muted">{{ loadingText }}</div>

      <template v-else>
        <div v-if="error" class="storage-error">
          {{ error }}
        </div>

        <template v-else>
          <!-- ✅ 문서/필드가 없으면 “미설정” 상태 표시 -->
          <div v-if="!hasStats" class="storage-empty">
            <div class="storage-empty-title">용량 데이터가 아직 없어요</div>
            <div class="storage-empty-sub">
              Firestore <b>{{ docPath }}</b> 문서에
              <b>{{ usedField }}</b>(number),
              <b>{{ updatedAtField }}</b>(timestamp) 필드가 필요해요.
            </div>

            <div class="storage-empty-hint">
              위의 <b>{{ initText }}</b> 버튼을 누르면 문서를 자동으로 만들어줘요(값은 0부터 시작).
            </div>

            <div v-if="note" class="storage-note">
              {{ note }}
            </div>
          </div>

          <!-- ✅ 정상 표시 -->
          <template v-else>
            <div class="storage-nums">
              <div class="storage-used">
                <b>{{ usedText }}</b>
                <span class="storage-muted">{{ usedLabel }}</span>
              </div>
              <div class="storage-sep">/</div>
              <div class="storage-limit">
                <b>{{ limitText }}</b>
                <span class="storage-muted">{{ limitLabel }}</span>
              </div>
            </div>

            <div
              class="storage-bar"
              role="progressbar"
              :aria-valuenow="percentInt"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div class="storage-bar-fill" :style="{ width: percent + '%' }" />
            </div>

            <div class="storage-foot">
              <span class="storage-muted">{{ percentLabel }}</span>
              <b>{{ percentInt }}%</b>
              <span v-if="updatedAtText" class="storage-updated">
                · {{ updatedAtText }}
              </span>
            </div>

            <div v-if="note" class="storage-note">
              {{ note }}
            </div>
          </template>
        </template>
      </template>
    </div>
  </aside>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { db } from "@/lib/firebase";
import { doc, getDoc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";

/**
 * 이 컴포넌트는 "Storage 버킷 전체를 자동 계산"하지 않습니다.
 * - Firestore 문서(admin/stats)에 기록된 사용량(storageUsedBytes)을 표시합니다.
 * - 초기 생성 버튼으로 admin/stats 문서를 0으로 만들어둘 수 있습니다.
 */
const props = defineProps({
  docPath: { type: String, default: "admin/stats" },
  usedField: { type: String, default: "storageUsedBytes" },
  updatedAtField: { type: String, default: "storageUpdatedAt" },

  limitBytes: { type: Number, default: 1024 ** 3 }, // 1GB
  subscribe: { type: Boolean, default: true },

  showRefresh: { type: Boolean, default: true },

  // ✅ init button
  showInit: { type: Boolean, default: true },
  initText: { type: String, default: "초기 생성" },
  initBusyText: { type: String, default: "생성 중…" },
  initTitle: { type: String, default: "Firestore에 admin/stats 문서를 생성합니다(테스트/초기화용)" },

  title: { type: String, default: "Storage" },
  note: {
    type: String,
    default: "* 관리자 페이지를 통해 업로드/삭제된 파일 기준으로 계산됩니다.",
  },

  ariaLabel: { type: String, default: "Firebase Storage usage" },

  usedLabel: { type: String, default: "사용 중" },
  limitLabel: { type: String, default: "한도(표시용)" },
  percentLabel: { type: String, default: "사용률" },

  refreshText: { type: String, default: "새로고침" },
  refreshTitle: { type: String, default: "새로고침" },
  loadingText: { type: String, default: "불러오는 중…" },
});

const loading = ref(true);
const error = ref("");

const usedBytes = ref(null); // ✅ null이면 “미설정”
const updatedAt = ref(null);

const initBusy = ref(false);
let unsub = null;

function parseDocPath(p) {
  return String(p || "")
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean);
}

const docRef = computed(() => {
  const segs = parseDocPath(props.docPath);
  if (segs.length < 2 || segs.length % 2 !== 0) return doc(db, "admin", "stats");
  return doc(db, ...segs);
});

function formatBytes(bytes) {
  const n = Number(bytes || 0);
  if (!isFinite(n) || n <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let v = n;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  const fixed = v >= 10 || i === 0 ? 0 : 1;
  return `${v.toFixed(fixed)} ${units[i]}`;
}

function toDateMaybe(ts) {
  if (!ts) return null;
  if (typeof ts?.toDate === "function") return ts.toDate();
  const d = typeof ts === "number" ? new Date(ts) : new Date(ts);
  return isNaN(d.getTime()) ? null : d;
}

function readFromSnap(snap) {
  if (!snap.exists()) {
    usedBytes.value = null;
    updatedAt.value = null;
    return;
  }
  const data = snap.data() || {};

  const u = data?.[props.usedField];
  const hasUsed = typeof u === "number" && isFinite(u);

  usedBytes.value = hasUsed ? u : null;
  updatedAt.value = data?.[props.updatedAtField] ?? null;
}

async function reloadOnce() {
  loading.value = true;
  error.value = "";
  try {
    const segs = parseDocPath(props.docPath);
    if (segs.length < 2 || segs.length % 2 !== 0) {
      throw new Error(`docPath가 올바르지 않습니다: "${props.docPath}"`);
    }
    const snap = await getDoc(docRef.value);
    readFromSnap(snap);
  } catch (e) {
    error.value = e?.message || "Storage 사용량을 불러오지 못했습니다.";
  } finally {
    loading.value = false;
  }
}

function startSubscribe() {
  loading.value = true;
  error.value = "";
  try {
    const segs = parseDocPath(props.docPath);
    if (segs.length < 2 || segs.length % 2 !== 0) {
      throw new Error(`docPath가 올바르지 않습니다: "${props.docPath}"`);
    }

    unsub = onSnapshot(
      docRef.value,
      (snap) => {
        readFromSnap(snap);
        loading.value = false;
      },
      (err) => {
        error.value = err?.message || "Storage 사용량을 구독할 수 없습니다.";
        loading.value = false;
      }
    );
  } catch (e) {
    error.value = e?.message || "Storage 사용량을 구독할 수 없습니다.";
    loading.value = false;
  }
}

/** ✅ 테스트/초기화용: 문서 생성 */
async function initDoc() {
  if (!confirm(`Firestore에 "${props.docPath}" 문서를 생성할까요?\n(값은 0으로 시작합니다)`)) return;

  initBusy.value = true;
  error.value = "";
  try {
    await setDoc(
      docRef.value,
      {
        [props.usedField]: 0,
        [props.updatedAtField]: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (e) {
    error.value =
      e?.message ||
      "초기 생성에 실패했습니다. (Firestore 보안 규칙/권한을 확인해주세요)";
  } finally {
    initBusy.value = false;
  }
}

const hasStats = computed(() => typeof usedBytes.value === "number" && isFinite(usedBytes.value));

const usedText = computed(() => (hasStats.value ? formatBytes(usedBytes.value) : "—"));
const limitText = computed(() => (props.limitBytes > 0 ? formatBytes(props.limitBytes) : "—"));

const percent = computed(() => {
  if (!hasStats.value) return 0;
  if (!props.limitBytes || props.limitBytes <= 0) return 0;
  const p = (usedBytes.value / props.limitBytes) * 100;
  return Math.max(0, Math.min(100, p));
});
const percentInt = computed(() => Math.round(percent.value));

const updatedAtText = computed(() => {
  const d = toDateMaybe(updatedAt.value);
  if (!d) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
});

onMounted(() => {
  if (props.subscribe) startSubscribe();
  else reloadOnce();
});

onBeforeUnmount(() => {
  if (typeof unsub === "function") unsub();
});
</script>

<style scoped>
.storage-box {
  width: 340px;
  flex: 0 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 14px 14px 12px;
  background: #fff;
}

.storage-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.storage-title {
  font-size: 13px;
  font-weight: 700;
}

.storage-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.storage-btn {
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #fff;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 10px;
  cursor: pointer;
}

.storage-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.storage-btn.primary {
  background: #111;
  color: #fff;
  border-color: rgba(0, 0, 0, 0.12);
}

.storage-main {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.storage-nums {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}

.storage-used,
.storage-limit {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.storage-sep {
  color: #aaa;
}

.storage-muted {
  font-size: 12px;
  color: #777;
}

.storage-error {
  font-size: 12px;
  color: #b00020;
  white-space: pre-wrap;
}

.storage-empty {
  border: 1px dashed rgba(0, 0, 0, 0.14);
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  padding: 12px;
}

.storage-empty-title {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 6px;
}

.storage-empty-sub {
  font-size: 12px;
  color: #666;
  line-height: 1.35;
}

.storage-empty-hint {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  line-height: 1.35;
}

.storage-bar {
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.storage-bar-fill {
  height: 100%;
  background: rgba(0, 0, 0, 0.18);
  border-radius: 999px;
  transition: width 0.18s ease;
}

.storage-foot {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 12px;
}

.storage-updated {
  color: #999;
}

.storage-note {
  margin-top: 8px;
  font-size: 11px;
  color: #999;
  line-height: 1.35;
}
</style>
