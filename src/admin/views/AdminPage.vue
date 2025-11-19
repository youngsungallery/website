<template>
  <div class="admin-page">
    <h1>관리자 페이지</h1>
    <p>환영합니다, 관리자님!</p>
    <div v-if="userEmail">
      <p>현재 로그인된 관리자: {{ userEmail }}</p>
      <button @click="handleSignOut" class="google-logout-btn">
        로그아웃
      </button>
    </div>
    <div v-else>
      <!-- ✨ `g_id_onload`는 HTML의 script가 처리하도록 하고, 이곳에 버튼을 직접 렌더링 ✨ -->
      <div id="google-signin-button"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// ✨ 환경 변수 값이 제대로 들어오는지 확인하는 로그 ✨
console.log('VITE_GOOGLE_CLIENT_ID:', googleClientId); 

// 이메일 또는 에러 메시지가 뜨면 알림
if (!googleClientId) {
  alert("오류: Google Client ID 환경 변수(VITE_GOOGLE_CLIENT_ID)를 찾을 수 없습니다.");
  console.error("Missing VITE_GOOGLE_CLIENT_ID. Check Netlify environment variables.");
}

const userEmail = ref(null);

// Google Sign-In 콜백 함수 (전역으로 등록되어야 Google 라이브러리가 찾을 수 있음)
window.handleCredentialResponse = async (response) => {
  const idToken = response.credential;
  console.log("Encoded ID Token: " + idToken);

  // ✨ ID 토큰을 백엔드(Netlify Function)로 보내 검증하고 실제 로그인 처리 ✨
  try {
    const res = await fetch('/.netlify/functions/verify-google-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();

    if (res.ok && data.token) { // HTTP 상태 코드 200번대 + 토큰 존재 확인
      userEmail.value = data.email;
      console.log("Login successful from Netlify Function:", data.email);
      alert(`로그인 성공! ${data.email} (Netlify Function 검증 완료)`);
      // ✨ 여기서 받은 data.token (커스텀 인증 토큰)을 저장해야 함 (예: localStorage.setItem('authToken', data.token);)
      localStorage.setItem('authToken', data.token); 
    } else {
      console.error("Netlify Function login failed:", data.body);
      alert(`로그인 실패: ${data.body || '서버 오류'}`);
      userEmail.value = null;
    }
  } catch (error) {
    console.error("Error calling Netlify Function:", error);
    alert("로그인 중 오류 발생 (Netlify Function 통신 오류)");
    userEmail.value = null;
  }
};

// 로그아웃 함수
const handleSignOut = () => {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    // google.accounts.id.disableAutoSelect(); // 필요시 자동 로그인 방지
  }
  userEmail.value = null; // UI에서 이메일 제거
  localStorage.removeItem('authToken'); // 저장된 인증 토큰 삭제
  alert("로그아웃되었습니다.");
};

onMounted(() => {
  // 컴포넌트 마운트 시 JWT 토큰으로 로그인 상태 복원 시도 (나중에 페이지 보호 시 사용)
  const storedToken = localStorage.getItem('authToken');
  if (storedToken) {
    try {
      // 실제로는 서버에서 토큰 유효성을 검증하는 API를 호출해야 안전함.
      // 여기서는 임시로 토큰에서 이메일을 추출하여 UI에 표시.
      const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
      userEmail.value = decodedToken.email;
      console.log('Restored login state from token:', userEmail.value);
    } catch (e) {
      console.error('Invalid stored token', e);
      localStorage.removeItem('authToken');
    }
  }

  // ✨ Google Sign-In 초기화 및 버튼 렌더링은 client_id가 있을 때만 실행 ✨
  // Google GIS 라이브러리가 로드되었는지 확인하고, client_id가 유효할 때만 initialize
  if (window.google && window.google.accounts && window.google.accounts.id && googleClientId) {
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: window.handleCredentialResponse, // 전역 콜백 함수 사용
      auto_select: false, // 자동 로그인 방지 (테스트 용이하게)
      cancel_on_tap_outside: true, // 팝업 외부 클릭 시 취소
    });
    
    // ✨ "Google로 로그인" 버튼을 'google-signin-button' div 안에 명시적으로 렌더링 ✨
    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-button"), 
      { theme: "outline", size: "large", text: "signin_with", shape: "rectangular" }
    );
  } else {
    console.error("Google Identity Services script not ready or client ID is invalid.");
  }
});

onBeforeUnmount(() => {
  // 컴포넌트 언마운트 시 전역 콜백 제거 (불필요할 수 있지만 안전을 위해)
  if (window.handleCredentialResponse) {
    // delete window.handleCredentialResponse; // 실제 프로덕션에서는 라이브러리 관리에 따라 다름
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
  background-color: #dc3545; /* 빨간색 */
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