<!-- FILE: src/pages/admin/AdminLoginPage.vue -->
<template>
  <section class="admin-login">
    <header class="page-head">
      <h2 class="page-title">관리자 로그인</h2>
      <p class="page-desc">Google 계정으로 로그인합니다.</p>
    </header>

    <button class="google-btn" type="button" :disabled="loading" @click="loginWithGoogle">
      {{ loading ? "로그인 중…" : "Google로 로그인" }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from "firebase/auth";
import { auth, googleProvider, ADMIN_EMAIL } from "@/lib/firebase";

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const error = ref("");

/**
 * ✅ GH Pages(/website) + redirect 로그인 대응
 * - popup 성공: 즉시 라우팅
 * - popup 실패 시 redirect: 돌아왔을 때(getRedirectResult) 권한체크 후 라우팅
 * - redirect query는 router base에 의해 /website/... 로 자동 처리됨
 */

async function finalizeLogin(cred) {
  const userEmail = (cred?.user?.email || "").toLowerCase();
  const adminEmail = String(ADMIN_EMAIL || "").toLowerCase();

  if (!userEmail || userEmail !== adminEmail) {
    await signOut(auth);
    throw new Error("관리자 권한이 없습니다.");
  }

  const redirect =
    typeof route.query.redirect === "string" && route.query.redirect.trim()
      ? route.query.redirect
      : "/admin";

  await router.replace(redirect);
}

/** redirect 로그인으로 돌아온 케이스 처리 */
(async function handleRedirectReturn() {
  try {
    const res = await getRedirectResult(auth);
    if (!res) return; // redirect 복귀가 아니면 패스

    loading.value = true;
    error.value = "";
    await finalizeLogin(res);
  } catch (e) {
    error.value = e?.message || "로그인에 실패했습니다.";
  } finally {
    loading.value = false;
  }
})();

async function loginWithGoogle() {
  loading.value = true;
  error.value = "";

  try {
    // ✅ 팝업 우선 (주소 틀어짐 최소화)
    const cred = await signInWithPopup(auth, googleProvider);
    await finalizeLogin(cred);
  } catch (e) {
    // 팝업 차단/사용자 종료/환경 문제면 redirect로
    const code = e?.code || "";

    const shouldRedirect =
      code === "auth/popup-blocked" ||
      code === "auth/popup-closed-by-user" ||
      code === "auth/operation-not-supported-in-this-environment";

    if (shouldRedirect) {
      try {
        // redirect는 페이지 이동이므로 여기서 loading을 풀 필요 없음
        await signInWithRedirect(auth, googleProvider);
        return;
      } catch (e2) {
        error.value = e2?.message || "로그인에 실패했습니다.";
      }
    } else {
      error.value = e?.message || "로그인에 실패했습니다.";
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.admin-login {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 420px;
  margin: 0 auto;
}

.page-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 13px;
  color: #666;
  margin: 0;
}

.google-btn {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #111;
  color: #fff;
  cursor: pointer;
}

.google-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  font-size: 12px;
  color: #b00020;
  margin: 0;
}
</style>
