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
      data-client_id="YOUR_GOOGLE_CLIENT_ID" 
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
// Netlify 환경 변수는 `process.env.환경변수명` 또는 Vite의 경우 `import.meta.env.VITE_환경변수명`으로 접근
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// 사용자 이메일을 저장할 반응형 변수
const userEmail = ref(null);

// Google Sign-In 콜백 함수 (전역으로 등록되어야 Google 라이브러리가 찾을 수 있음)
// 이 함수는 window 객체에 직접 할당하여 전역에서 접근 가능하도록 합니다.
window.handleCredentialResponse = (response) => {
  // 'response.credential'에는 사용자의 ID 토큰이 포함되어 있습니다.
  const idToken = response.credential;
  
  // ✨ ID 토큰을 백엔드(Netlify Function)로 보내 검증하고 실제 로그인 처리를 해야 합니다. ✨
  // 지금은 단순히 콘솔에 출력하고, 이메일을 파싱하여 UI에 표시하는 로직만 구현합니다.
  console.log("Encoded ID Token: " + idToken);

  // ID 토큰은 JWT(JSON Web Token) 형식이므로 디코딩해서 정보를 얻을 수 있습니다.
  // 실제 프로덕션에서는 백엔드에서 검증해야 안전합니다.
  try {
    const decodedToken = JSON.parse(atob(idToken.split('.')[1]));
    userEmail.value = decodedToken.email;
    console.log("Logged in as:", userEmail.value);
    
    // ✨ 로그인 성공 후 필요한 리디렉션 또는 데이터 로딩 처리 ✨
    // (현재는 그냥 이메일만 표시)
    alert(`로그인 성공! ${userEmail.value}`);

  } catch (error) {
    console.error("Failed to decode ID token:", error);
    userEmail.value = null;
  }
};

// 로그아웃 함수
const handleSignOut = () => {
  if (google.accounts.id) {
    google.accounts.id.disableAutoSelect(); // 자동 로그인 방지
    google.accounts.id.revoke(userEmail.value, (done) => { // 특정 계정의 동의 철회
      console.log('Revocation successful:', done);
      userEmail.value = null;
      // Netlify Function을 통한 세션 무효화 요청 (나중에 구현)
    });
  }
  userEmail.value = null; // UI에서 이메일 제거
  alert("로그아웃되었습니다.");
};

onMounted(() => {
  // `google.accounts.id.initialize` 함수를 사용하여 Google Sign-In 초기화
  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.initialize({
      client_id: googleClientId, // Netlify 환경 변수에서 가져온 클라이언트 ID
      callback: handleCredentialResponse // 로그인 성공 시 호출될 콜백 함수
    });
    
    // ✨ "Google로 로그인" 버튼을 렌더링 ✨
    // `g_id_signin` 클래스를 가진 div 안에 버튼이 자동으로 그려집니다.
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