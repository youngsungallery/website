// FILE: src/lib/storageUsage.js
import { db } from "@/lib/firebase";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";

function parseDocPath(docPath) {
  return String(docPath)
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * storageUsedBytes를 트랜잭션으로 증감
 * (음수 허용, 0 미만 방지)
 */
export async function bumpStorageUsedBytes(
  deltaBytes,
  docPath = "admin/stats",
  usedField = "storageUsedBytes",
  updatedAtField = "storageUpdatedAt"
) {
  const delta = Number(deltaBytes ?? 0);
  if (!Number.isFinite(delta) || delta === 0) return;

  const ref = doc(db, ...parseDocPath(docPath));

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const cur = snap.exists() ? Number(snap.data()?.[usedField] || 0) : 0;
    const next = Math.max(0, cur + delta);

    tx.set(
      ref,
      {
        [usedField]: next,
        [updatedAtField]: serverTimestamp(),
      },
      { merge: true }
    );
  });
}

/**
 * Firestore 문서 용량 "추정치"
 * (보이는 변화용)
 */
export function estimateDocBytes(obj) {
  try {
    const s = JSON.stringify(obj ?? {});
    return Math.max(0, s.length);
  } catch {
    return 0;
  }
}
