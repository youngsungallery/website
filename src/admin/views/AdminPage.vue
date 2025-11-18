<template>
  <div class="admin-page">
    <h1>관리자 페이지</h1>
    <p>여기는 관리자만 접근해야 하는 페이지입니다. 현재는 임시 화면입니다.</p>
    <p>인증 기능은 다음 단계에서 추가될 예정입니다.</p>
    
    <!-- Netlify Identity 로그인 버튼 -->
    <button @click="openNetlifyIdentityLogin" class="netlify-login-btn">
      Netlify Identity 로그인
    </button>

    <!-- ✨ 새로 추가하는 버튼: 강제로 비밀번호 설정 화면 띄우기! ✨ -->
    <button @click="forceOpenPasswordSet" class="netlify-login-btn force-password-btn">
      (긴급) 비밀번호 재설정 창 띄우기
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const openNetlifyIdentityLogin = () => {
  if (window.netlifyIdentity) {
    console.log('Opening Netlify Identity widget via login button click...');
    window.netlifyIdentity.open(); // 일반 로그인/사용자 패널을 띄움
  } else {
    console.error('Netlify Identity widget not loaded on login button click.');
    alert('Netlify Identity 위젯이 로드되지 않았습니다.');
  }
};

// ✨ 새로 추가하는 함수: 비밀번호 설정 모드로 위젯 열기! ✨
const forceOpenPasswordSet = () => {
  if (window.netlifyIdentity) {
    console.log('Forcing Netlify Identity widget to password reset mode...');
    // `page: 'password'` 인자를 넘겨서 비밀번호 설정 화면을 강제로 띄운다
    window.netlifyIdentity.open({ page: 'password' }); 
  } else {
    console.error('Netlify Identity widget not loaded on force password set button click.');
    alert('Netlify Identity 위젯이 로드되지 않았습니다.');
  }
};


// 페이지 로드 시 초기화는 해두는 것이 좋으므로 App.vue의 로직 일부를 가져옴
onMounted(() => {
  if (window.netlifyIdentity) {
    window.netlifyIdentity.init(); 
    window.netlifyIdentity.on("init", user => {
      console.log("AdminPage Netlify Identity initialized:", user);
    });
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

.netlify-login-btn {
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px; /* 버튼 사이 간격 */

  &:hover {
    background-color: #0056b3;
  }
}

/* 새로 추가된 버튼 스타일 (구분용) */
.force-password-btn {
  background-color: #28a745; /* 녹색 */
  &:hover {
    background-color: #218838;
  }
}
</style>