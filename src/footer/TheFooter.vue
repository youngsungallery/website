<!-- src/footer/TheFooter.vue -->
<template>
  <footer class="app-footer">
    <!-- 푸터 구분선은 TheFooter.vue에서 직접 관리합니다. -->
    <hr class="footer-divider"> 

    <!-- 1. Copyright 및 서버 시각 섹션 -->
    <!-- CopyrightSection에 formattedServerTime을 prop으로 전달합니다! -->
    <CopyrightSection :formattedServerTime="formattedServerTime" />

    <hr class="footer-divider"> 

    <!-- 2. 기술 스택 섹션 -->
    <TechStackSection />

    <hr class="footer-divider"> 

    <!-- 3. 연락처 정보 섹션 -->
    <ContactInfoSection />

    <hr class="footer-divider"> 

    <!-- 4. 소셜 링크 섹션 -->
    <SocialLinksSection />
  </footer>
</template>

<script setup>
import { useServerTime } from '@/composables/useServerTime';

// 푸터에서 사용할 자식 컴포넌트들을 임포트합니다.
import CopyrightSection from '@/footer/components/CopyrightSection.vue';
import TechStackSection from '@/footer/components/TechStackSection.vue';
import ContactInfoSection from '@/footer/components/ContactInfoSection.vue';
import SocialLinksSection from '@/footer/components/SocialLinksSection.vue';

// useServerTime Composable을 호출하여 formattedServerTime을 가져옵니다.
const { formattedServerTime } = useServerTime();

// ⭐⭐⭐ TheFooter 컴포넌트 자체에는 formattedServerTime prop을 정의하는 defineProps가 없습니다.
// ⭐⭐⭐ 따라서 여기에 Missing required prop 에러는 발생하지 않아야 합니다.

</script>

<style scoped lang="scss">
@use '@/footer/style/_footer.scss'; 

// 이 컴포넌트에는 특별한 스타일이 필요 없습니다.
</style>