<template>
  <div class="admin-page">
    <h1>관리자 페이지</h1>
    <p>여기는 관리자만 접근해야 하는 페이지입니다.</p>
    <p>Netlify Identity 위젯이 여기에 표시됩니다.</p>
    
    <!-- ✨ Netlify Identity 위젯이 삽입될 div 태그 추가! ✨ -->
    <!-- `data-netlify-identity-button`을 쓰면 팝업이 뜨고, `data-netlify-identity-menu`를 쓰면 고정 메뉴가 떠 -->
    <!-- 지금은 메뉴 형태로 고정해서 위젯이 로드되는지 확인하자 -->
    <div data-netlify-identity-menu></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (window.netlifyIdentity) {
    window.netlifyIdentity.init(); // 위젯 초기화는 필수

    // 위젯이 열리는 타이밍을 강제하지 않고, data-netlify-identity-menu에 위젯이 그려지길 기대
    window.netlifyIdentity.on("init", user => {
      console.log("AdminPage Netlify Identity initialized:", user);
    });

    window.netlifyIdentity.on("open", () => console.log("Netlify Identity widget opened"));
    window.netlifyIdentity.on("close", () => console.log("Netlify Identity widget closed"));
    window.netlifyIdentity.on("login", user => console.log("Logged in:", user));
    window.netlifyIdentity.on("logout", () => console.log("Logged out"));

  } else {
    console.error('Netlify Identity widget script not found in window on AdminPage.');
    alert('Netlify Identity 위젯 스크립트가 로드되지 않았습니다.');
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

/* 기존 버튼 관련 스타일은 이제 필요 없어 */
/* .netlify-login-btn { ... } */
/* .force-password-btn { ... } */
</style>