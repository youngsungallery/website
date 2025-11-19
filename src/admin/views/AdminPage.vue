<template>
  <div class="admin-page">
    <h1>관리자 페이지</h1>
    <p>환영합니다, 관리자님!</p>
    <div v-if="auth.isAuthenticated()">
      <p>현재 로그인된 관리자: {{ auth.getEmailFromToken() }}</p>
      <button @click="handleSignOut" class="google-logout-btn">
        로그아웃
      </button>
    </div>
    <div v-else>
      <!-- ✨ 우리가 직접 만든 로그인 버튼 ✨ -->
      <button @click="triggerGoogleLogin" class="custom-google-login-btn">
        로그인
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'; // watch는 더 이상 필요 없음
import auth from '@/stores/auth';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

console.log('VITE_GOOGLE_CLIENT_ID:', googleClientId); 

if (!googleClientId) {
  alert("오류: Google Client ID 환경 변수(VITE_GOOGLE_CLIENT_ID)를 찾을 수 없습니다.");
  console.error("Missing VITE_GOOGLE_CLIENT_ID. Check Netlify environment variables.");
}

// Google Sign-In 콜백 함수 (전역으로 등록)
window.handleCredentialResponse = async (response) => {
  const idToken = response.credential;
  console.log("Encoded ID Token: " + idToken);

  try {
    const res = await fetch('/.netlify/functions/verify-google-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      auth.login({ email: data.email }, data.token); 
      console.log("Login successful from Netlify Function:", data.email);
      alert(`로그인 성공! ${data.email} (Netlify Function 검증 완료)`);
    } else {
      console.error("Netlify Function login failed:", data.body);
      alert(`로그인 실패: ${data.body || '서버 오류'}`);
      auth.logout();
    }
  } catch (error) {
    console.error("Error calling Netlify Function:", error);
    alert("로그인 중 오류 발생 (Netlify Function 통신 오류)");
    auth.logout();
  }
};

// ✨ 우리가 만든 버튼을 클릭했을 때 GSI 로그인 과정을 시작하는 함수 ✨
const triggerGoogleLogin = () => {
  if (window.google && window.google.accounts && window.google.accounts.id && googleClientId) {
    // initialize는 onMounted에서 한번만 호출
    // prompt()를 호출하여 Google 로그인 선택 창을 띄웁니다.
    window.google.accounts.id.prompt((notification) => {
      // prompt()의 콜백은 One Tap UI 상태를 알려주지만,
      // 우리는 GSI 팝업 플로우를 주로 사용하므로,
      // 별도의 action 없이 GSI가 팝업을 띄우는 역할만 하게 둡니다.
      if (notification.isCanceled()) {
        console.log("Google login prompt was canceled.");
      } else if (notification.isSkippedMoment()) {
        console.log("Google login prompt was skipped (moment not available).");
      }
    });
  } else {
    console.error("Google Identity Services script not ready or client ID is invalid.");
    alert("Google 로그인 서비스를 초기화할 수 없습니다. 잠시 후 다시 시도해 주세요.");
  }
};


// 로그아웃 함수
const handleSignOut = () => {
  auth.logout(); 
  alert("로그아웃되었습니다.");
  // ✨ 로그아웃 시 Google 세션을 초기화하는 것이 좋습니다. ✨
  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.disableAutoSelect(); // 다음에 자동 로그인 방지
    // GSI는 명시적인 클라이언트측 로그아웃 API가 없으므로,
    // 세션 토큰 삭제와 자동선택 방지 정도로 처리합니다.
  }
};

onMounted(() => {
  // 컴포넌트 마운트 시 GSI 초기화는 한 번만!
  if (window.google && window.google.accounts && window.google.accounts.id && googleClientId) {
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: window.handleCredentialResponse,
      auto_select: false, // 자동 로그인 방지
      cancel_on_tap_outside: true, // 팝업 외부 클릭 시 취소
    });
    // GSI 버튼 렌더링은 더 이상 하지 않습니다.
    // prompt()는 사용자가 버튼 클릭 시 호출됩니다.
  } else {
    console.error("Google Identity Services script not ready or client ID is invalid.");
  }
});

onBeforeUnmount(() => {
  if (window.handleCredentialResponse) {
    // delete window.handleCredentialResponse;
  }
});
</script>

<style lang="scss" scoped>
/* 관리 페이지 전용 스타일 */
.admin-page {
  padding-top: 100px; 
  text-align: center;
  background-color: #f0f8ff; 
  min-height: calc(100vh - 180px); 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.admin-page h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.admin-page p {
  color: #555;
  font-size: 1.1em;
}

.google-logout-btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #dc3545; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
}

/* ✨ 우리가 만든 커스텀 로그인 버튼 스타일 ✨ */
.custom-google-login-btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #4285F4; /* Google Blue */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ae8;
  }
}
</style>