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
import { onMounted, onBeforeUnmount, watch } from 'vue';
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

// 로그인 버튼 렌더링 함수 (재사용을 위해 분리)
const renderGoogleSignInButton = () => {
  if (window.google && window.google.accounts && window.google.accounts.id && googleClientId) {
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: window.handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    
    // 버튼을 다시 렌더링 요청
    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-button"), 
      { theme: "outline", size: "large", text: "signin", shape: "rectangular" } // ✨ "signin_with" -> "signin"으로 변경! ✨
    );
  } else {
    console.error("Google Identity Services script not ready or client ID is invalid.");
  }
};


// 로그아웃 함수
const handleSignOut = () => {
  auth.logout(); 
  alert("로그아웃되었습니다.");
  setTimeout(() => {
    renderGoogleSignInButton();
  }, 100); 
};

// auth.isAuthenticated() 값의 변경을 감시
watch(() => auth.isAuthenticated(), (newValue, oldValue) => {
  if (oldValue && !newValue) { 
    console.log('User logged out. Attempting to re-render Google Sign-In button.');
  } else if (!oldValue && newValue) { 
    console.log('User logged in. Google Sign-In button should be hidden.');
  }
});


onMounted(() => {
  if (!auth.isAuthenticated()) {
    renderGoogleSignInButton();
  } else {
    console.log('User already authenticated. Showing logout button.');
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

/* Google Sign-In 버튼을 감싸는 div */
#google-signin-button {
  margin-top: 20px;
}
</style>