<!-- src/footer/components/CopyrightSection.vue -->
<template>
  <div class="copyright-section">
    <p>Copyright © 2025 Youngsun Gallery. All rights reserved.</p>
    <!-- 여기에 props로 받은 시간을 표시합니다! -->
    <p>현재 서버 시각: {{ formattedServerTime }}</p> 
  </div>
</template>

<script setup>
const props = defineProps({
  formattedServerTime: {
    type: String,
    // ⭐⭐⭐ required: true를 제거했습니다! ⭐⭐⭐
    // required: true, 
    default: '시간 정보를 불러오는 중...' 
  }
});

// ⭐⭐⭐ prop으로 뭐가 들어오는지 확실히 알 수 있는 console.log 추가 ⭐⭐⭐
console.log(`[CopyrightSection.vue] Received formattedServerTime prop: ${props.formattedServerTime}`);

</script>

<style scoped>
.copyright-section {
  text-align: center;
  padding: 10px 0;
  font-size: 0.85em;
  color: #666;
}
</style>