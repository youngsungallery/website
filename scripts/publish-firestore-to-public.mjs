import admin from "firebase-admin";
import fs from "fs";
import path from "path";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function getKstStamp() {
  const now = new Date();
  const kst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  return `${kst.getFullYear()}${pad2(kst.getMonth() + 1)}${pad2(kst.getDate())}`;
}

// Timestamp 직렬화(ISO 문자열로)
function jsonReplacer(_k, v) {
  if (v && typeof v === "object") {
    // admin.firestore.Timestamp 유사 구조
    if (v._seconds != null && v._nanoseconds != null) {
      const ms = v._seconds * 1000 + Math.floor(v._nanoseconds / 1e6);
      return new Date(ms).toISOString();
    }
    if (v instanceof Date) return v.toISOString();
  }
  return v;
}

async function dumpCollection(db, name) {
  const snap = await db.collection(name).get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// 컬렉션 문서 전부 삭제(500개 단위 배치)
async function deleteCollection(db, name) {
  const colRef = db.collection(name);

  while (true) {
    const snap = await colRef.limit(500).get();
    if (snap.empty) break;

    const batch = db.batch();
    snap.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  }
}

async function main() {
  const saRaw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!saRaw) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT secret.");

  const serviceAccount = JSON.parse(saRaw);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = admin.firestore();

  // 너의 운영 데이터 대상 컬렉션들
  const collections = ["exhibitions", "lectures"];

  const stamp = getKstStamp();

  const payload = {
    meta: {
      timezone: "Asia/Seoul",
      publishedAt: new Date().toISOString(),
      stampKST: stamp,
      collections,
    },
    data: {},
  };

  for (const c of collections) {
    payload.data[c] = await dumpCollection(db, c);
  }

  // 저장 경로: public/data
  const outDir = path.join("public", "data");
  ensureDir(outDir);

  const latestPath = path.join(outDir, "firestore-latest.json");
  const datedPath = path.join(outDir, `firestore-${stamp}.json`);

  const json = JSON.stringify(payload, jsonReplacer, 2);
  fs.writeFileSync(latestPath, json, "utf8");
  fs.writeFileSync(datedPath, json, "utf8");

  console.log("Wrote:", latestPath);
  console.log("Wrote:", datedPath);

  // 발행 후 Firestore 비우기(요구사항)
  for (const c of collections) {
    await deleteCollection(db, c);
    console.log("Cleared collection:", c);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
