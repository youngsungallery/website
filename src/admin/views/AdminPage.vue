<template>
  <div class="admin-page">
    <h1>관리자 페이지</h1>
    <p>여기는 관리자만 접근해야 하는 페이지입니다. 현재는 임시 화면입니다.</p>
    <p>인증 기능은 다음 단계에서 추가될 예정입니다.</p>
    
    <!-- ✨ Netlify Identity 로그인 버튼 추가 ✨ -->
    <button @click="openNetlifyIdentity" class="netlify-login-btn">
      Netlify Identity 로그인/가입
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const openNetlifyIdentity = () => {
  if (window.netlifyIdentity) {
    console.log('Opening Netlify Identity widget via button click...');
    window.netlifyIdentity.open();
  } else {
    console.error('Netlify Identity widget not loaded on button click.');
    alert('Netlify Identity 위젯이 로드되지 않았습니다.');
  }
};

// 페이지 로드 시에도 초기화는 해두는 것이 좋으므로 App.vue의 로직 일부를 가져옴
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
  padding-top: 100px; /* 헤더와의 간격 고려 */
  text-align: center;
  background-color: #f0f8ff; /* 관리 페이지임을 시각적으로 구분 */
  min-height: calc(100vh - 180px); /* 푸터 높이 고려하여 최소 높이 설정 */
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

  &:hover {
    background-color: #0056b3;
  }
}
</style>