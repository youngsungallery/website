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
      <div id="google-signin-button"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import auth from '@/stores/auth'; // ✨ Auth Store 임포트 ✨

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
      // ✨ authStore를 통해 로그인 상태 저장 ✨
      auth.login({ email: data.email }, data.token); 
      console.log("Login successful from Netlify Function:", data.email);
      alert(`로그인 성공! ${data.email} (Netlify Function 검증 완료)`);
    } else {
      console.error("Netlify Function login failed:", data.body);
      alert(`로그인 실패: ${data.body || '서버 오류'}`);
      auth.logout(); // 로그인 실패 시 상태 초기화
    }
  } catch (error) {
    console.error("Error calling Netlify Function:", error);
    alert("로그인 중 오류 발생 (Netlify Function 통신 오류)");
    auth.logout(); // 에러 발생 시 상태 초기화
  }
};

// 로그아웃 함수
const handleSignOut = () => {
  auth.logout(); // ✨ authStore를 통해 로그아웃 처리 ✨
  alert("로그아웃되었습니다.");
};

onMounted(() => {
  // `Google Identity Services` 초기화
  if (window.google && window.google.accounts && window.google.accounts.id && googleClientId) {
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: window.handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    
    // 버튼 렌더링은 `auth.isAuthenticated()`가 false일 때만 (로그인되어 있지 않을 때만)
    // 컴포넌트 템플릿의 v-if 조건에 의해 자동으로 처리되므로, 
    // 여기서는 명시적으로 조건문을 넣을 필요는 없음
    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-button"), 
      { theme: "outline", size: "large", text: "signin_with", shape: "rectangular" }
    );
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
/* (생략 - 스타일은 이전과 동일) */
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

#google-signin-button {
  margin-top: 20px;
}
</style>