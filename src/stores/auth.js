import { ref } from 'vue';

// ✨ Auth Store (인증 상태 관리) ✨
const user = ref(null); // 로그인한 사용자 정보 (이메일 등)
const token = ref(localStorage.getItem('authToken')); // localStorage에서 인증 토큰 로드

const authStore = {
  user,
  token,

  // 로그인 시 사용자 정보와 토큰 저장
  login(userData, authToken) {
    user.value = userData; // 예: { email: 'admin@example.com' }
    token.value = authToken;
    localStorage.setItem('authToken', authToken); // 토큰을 로컬 스토리지에 저장하여 새로고침 시에도 유지
  },

  // 로그아웃 시 사용자 정보와 토큰 제거
  logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('authToken'); // 로컬 스토리지에서 토큰 제거
    // 구글 계정에서도 로그아웃 시도 (선택 사항)
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.disableAutoSelect(); // 자동 로그인 방지
    }
  },

  // 인증 토큰이 유효한지 확인하는 함수 (실제로는 백엔드에서 검증해야 함)
  // 여기서는 토큰 존재 여부만으로 "로그인 상태" 여부를 판단.
  // 이 토큰이 "관리자" 토큰인지 여부는 라우터 가드에서 확인
  isAuthenticated() {
    return !!token.value; // 토큰이 존재하면 인증된 것으로 간주
  },

  // 현재 토큰에서 이메일 정보를 디코딩하여 반환 (UI 표시용)
  getEmailFromToken() {
    if (token.value) {
      try {
        const decodedToken = JSON.parse(atob(token.value.split('.')[1]));
        return decodedToken.email;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  }
};

export default authStore;