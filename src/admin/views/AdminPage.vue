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
      :data-client_id="googleClientId"  <!-- ✨ 이 부분이 수정되었어! ✨ -->
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

// ✨ 환경 변수에서 클라이언트 ID 가져오기 ✨
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// 사용자 이메일을 저장할 반응형 변수
const userEmail = ref(null);

// Google Sign-In 콜백 함수 (전역으로 등록되어야 Google 라이브러리가 찾을 수 있음)
window.handleCredentialResponse = (response) => {
  const idToken = response.credential;
  console.log("Encoded ID Token: " + idToken);

  try {
    const decodedToken = JSON.parse(atob(idToken.split('.')[1]));
    userEmail.value = decodedToken.email;
    console.log("Logged in as:", userEmail.value);
    
    alert(`로그인 성공! ${userEmail.value}`);

  } catch (error) {
    console.error("Failed to decode ID token:", error);
    userEmail.value = null;
  }
};

// 로그아웃 함수
const handleSignOut = () => {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    // google.accounts.id.disableAutoSelect(); // 필요시 자동 로그인 방지
    // google.accounts.id.revoke는 사용자의 동의를 철회하므로, 신중하게 사용 (모든 Google 서비스에서 연결 해제)
    // 그냥 클라이언트에서 세션 지우는게 일반적
    // window.google.accounts.id.revoke(userEmail.value, (done) => {
    //   console.log('Revocation successful:', done);
    // });
    userEmail.value = null; // UI에서 이메일 제거
    alert("로그아웃되었습니다.");
  }
};

onMounted(() => {
  // `google.accounts.id.initialize` 함수를 사용하여 Google Sign-In 초기화
  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.initialize({
      client_id: googleClientId, // Netlify 환경 변수에서 가져온 클라이언트 ID
      callback: handleCredentialResponse // 로그인 성공 시 호출될 콜백 함수
    });
    
    // ✨ "Google로 로그인" 버튼을 렌더링 ✨
    window.google.accounts.id.renderButton(
      document.querySelector(".g_id_signin"), // 버튼이 렌더링될 DOM 요소
      { theme: "outline", size: "large", text: "signin_with", shape: "rectangular" } // 버튼 스타일
    );
    
    // 페이지 로드 시 즉시 자격증명 응답 가져오기 (자동 로그인 시도)
    // window.google.accounts.id.prompt(); 

  } else {
    console.error("Google Identity Services script not loaded.");
  }
});

onBeforeUnmount(() => {
  // 컴포넌트 언마운트 시 전역 콜백 제거 (불필요할 수 있지만 안전을 위해)
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