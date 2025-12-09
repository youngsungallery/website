<template>
  <div>
    <h1>관리자 페이지</h1>
    <p>환영합니다, 관리자님! 구글 로그인 후 콘텐츠를 관리할 수 있습니다.</p>
    <router-link to="/">본사이트 홈으로 이동</router-link>
    <!-- 향후 로그인 버튼 및 콘텐츠 관리 UI 추가 예정 -->
  </div>
</template>

<script setup>
// 이제 src/styles/views 폴더에서 SCSS 스타일을 임포트합니다.
import '@/styles/views/AdminView.scss';

// 향후 구글 로그인 로직 및 콘텐츠 관리 로직 추가
</script>