<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <!-- 왼쪽: 갤러리 정보 -->
      <div class="footer-info">
        <p class="footer-name">영선갤러리</p>

        <p class="footer-item">
          <a
            href="https://map.naver.com/v5/search/경기%20수원시%20영통구%20덕영대로%201471번길%2059"
            target="_blank"
            rel="noopener"
            class="icon-link"
            aria-label="지도 보기"
          >
            📍
          </a>
          <span class="footer-text">
            경기 수원시 영통구 덕영대로 1471번길 59, 2층
          </span>
        </p>

        <p class="footer-item">
          <a href="tel:0312031089" class="icon-link" aria-label="전화 걸기">
            ☎
          </a>
          <span class="footer-text">031-203-1089</span>
        </p>
      </div>

      <!-- 오른쪽 -->
      <div class="footer-channels">
        <a
          href="https://www.youtube.com/@영선갤러리"
          target="_blank"
          rel="noopener"
          class="channel-item"
        >
          <img src="/youtube.png" alt="YouTube" class="channel-icon" />
          <span class="channel-text">영선갤러리</span>
        </a>

        <a
          href="https://open.kakao.com/o/gNPhwidf"
          target="_blank"
          rel="noopener"
          class="channel-item"
        >
          <img src="/kakaotalk.png" alt="KakaoTalk" class="channel-icon" />
          <span class="channel-text">영선갤러리</span>
        </a>

        <!-- KST 시간 -->
        <div class="time-card">
          <div class="time-tz">KST</div>
          <div class="time-date">{{ kstDate }}</div>
          <div class="time-clock">{{ kstClock }}</div>
        </div>

        <!-- 관리자 / 사이트 전환 -->
        <button type="button" class="admin-link" @click="handleAdminClick">
          {{ adminLink.label }}
        </button>
      </div>
    </div>

    <p class="footer-copy">© Youngsun Gallery</p>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const route = useRoute();
const router = useRouter();

/* 관리자 페이지 여부 */
const isAdmin = computed(() => route.path.startsWith("/admin"));

/* 버튼 텍스트 */
const adminLink = computed(() => {
  return isAdmin.value
    ? { label: "사이트로 나가기", to: "/" }
    : { label: "관리자접속", to: "/admin" };
});

/* 클릭 동작
   - 사이트에서: /admin으로 이동 (가드가 로그인 페이지로 보내줌)
   - 관리자에서: 무조건 로그아웃 후 홈으로 */
async function handleAdminClick() {
  if (!isAdmin.value) {
    router.push("/admin");
    return;
  }

  // 관리자 영역에서는 무조건 로그아웃
  try {
    await signOut(auth);
  } finally {
    // history 남기기 싫으면 replace 추천
    router.replace("/");
  }
}

/* KST 시간 */
const kstDate = ref("");
const kstClock = ref("");

function updateKST() {
  const now = new Date();

  const dateFmt = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const timeFmt = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const d = dateFmt.formatToParts(now);
  const t = timeFmt.formatToParts(now);
  const get = (p, type) => p.find((x) => x.type === type)?.value;

  kstDate.value = `${get(d, "year")}.${get(d, "month")}.${get(d, "day")}`;
  kstClock.value = `${get(t, "hour")}:${get(t, "minute")}`;
}

let timer;
onMounted(() => {
  updateKST();
  timer = setInterval(updateKST, 30000);
});
onBeforeUnmount(() => clearInterval(timer));
</script>

<style scoped>
.site-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding: 40px 20px 28px;
  background: #fff;
}

.footer-inner {
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

/* 왼쪽 정보 */
.footer-info {
  font-size: 13px;
  color: #555;
  line-height: 1.9;
}

.footer-name {
  font-weight: 600;
  color: #111;
  margin-bottom: 6px;
}

.footer-item {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.footer-text {
  color: #555;
}

.icon-link {
  text-decoration: none;
  font-size: 14px;
}

.icon-link:hover {
  opacity: 0.75;
}

/* 오른쪽 */
.footer-channels {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.channel-item {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.channel-icon {
  width: 18px;
  height: 18px;
}

.channel-text {
  font-size: 12px;
  color: #333;
  opacity: 0.85;
}

.channel-item:hover .channel-text {
  opacity: 1;
}

/* 시간 */
.time-card {
  margin-top: 4px;
  padding: 14px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 14px;
}

.time-tz {
  font-size: 11px;
  color: #777;
}

.time-date {
  font-size: 12px;
  color: #666;
  margin: 6px 0;
}

.time-clock {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
}

/* 관리자 버튼(링크처럼 보이게) */
.admin-link {
  margin-top: 6px;
  font-size: 11px;
  color: #999;
  letter-spacing: 0.08em;
  background: transparent;
  border: 0;
  padding: 0;
  text-align: left;
  cursor: pointer;
}

.admin-link:hover {
  color: #555;
}

/* 카피라이트 */
.footer-copy {
  margin-top: 24px;
  text-align: center;
  font-size: 12px;
  color: #888;
}
</style>
