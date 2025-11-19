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
    <div v-else id="g_id_onload"
      data-context="signin"
      data-ux_mode="popup"
      data-callback="handleCredentialResponse"
      data-auto_prompt="false">
    </div>
    <div v-if="!userEmail" class="g_id_signin"
      data-type="standard"
      data-shape="rectangular"
      data-theme="outline"
      data-text="signin_with"
      data-size="large"
      data-logo_alignment="left">
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// ✨ 환경 변수 값이 제대로 들어오는지 확인하는 로그 추가 ✨
console.log('VITE_GOOGLE_CLIENT_ID:', googleClientId); 

// 사용자 이메일을 저장할 반응형 변수
const userEmail = ref(null);

// Google Sign-In 콜백 함수 (전역으로 등록되어야 Google 라이브러리가 찾을 수 있음)
window.handleCredentialResponse = (response) => {
  const idToken = response.credential;
  console.log("Encoded ID Token: " + idToken);

  // ✨ Netlify Function으로 ID 토큰 전송 로직 ✨
  fetch('/.netlify/functions/verify-google-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken }),
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      userEmail.value = data.email;
      console.log("Login successful from Netlify Function:", data.email);
      alert(`로그인 성공! ${data.email} (Netlify Function 검증 완료)`);
      // ✨ 여기서 받은 data.token (커스텀 인증 토큰)을 저장하고 사용해야 합니다.
      // 예: localStorage.setItem('authToken', data.token);
    } else {
      console.error("Netlify Function login failed:", data.body);
      alert(`로그인 실패: ${data.body || '서버 오류'}`);
      userEmail.value = null;
    }
  })
  .catch(error => {
    console.error("Error calling Netlify Function:", error);
    alert("로그인 중 오류 발생 (Netlify Function 통신 오류)");
    userEmail.value = null;
  });
};

// 로그아웃 함수
const handleSignOut = () => {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    userEmail.value = null;
    // localStorage.removeItem('authToken'); // 저장된 인증 토큰 삭제
    alert("로그아웃되었습니다.");
  }
};

onMounted(() => {
  // `google.accounts.id.initialize` 함수를 사용하여 Google Sign-In 초기화
  if (window.google && window.google.accounts && window.google.accounts.id && googleClientId) {
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCredentialResponse
    });
    
    window.google.accounts.id.renderButton(
      document.querySelector(".g_id_signin"),
      { theme: "outline", size: "large", text: "signin_with", shape: "rectangular" }
    );
  } else {
    console.error("Google Identity Services script not loaded OR Client ID is missing.");
    if (!googleClientId) {
      alert("오류: Google Client ID 환경 변수(VITE_GOOGLE_CLIENT_ID)를 찾을 수 없습니다.");
      console.error("Missing VITE_GOOGLE_CLIENT_ID. Check Netlify environment variables.");
    }
  }
});

onBeforeUnmount(() => {
  if (window.handleCredentialResponse) {
    delete window.handleCredentialResponse;
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
#g_id_onload {
  margin-top: 20px;
}
.g_id_signin {
  /* Google 버튼에 대한 추가 스타일이 필요하면 여기에 작성 */
}
</style>