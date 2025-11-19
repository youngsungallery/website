<template>
  <footer class="app-footer">
    <div class="footer-bottom">
      <div class="footer-top-line">
        <h3>Youngsungallery 영선갤러리</h3>
        <p class="copyright">
          &copy; 2025 Youngsun Gallery. All rights reserved.
        </p> 
      </div>
      
      <div class="gallery-address-section">
        <p class="address-text">
          경기 수원시 영통구 덕영대로 1471번길 59, 2층
          <a href="https://map.naver.com/v5/search/경기 수원시 영통구 덕영대로 1471번길 59, 2층" target="_blank" rel="noopener noreferrer" class="map-link">
            지도 보기
          </a>
        </p>
        <p class="tel-number">
          Tel: 031-203-1089
          <a href="tel:0312031089" class="tel-link">
            <BaseIcon name="phone" width="16px" height="16px" />
          </a>
        </p>
      </div>

      <div class="social-section">
        <p class="social-heading">social</p>
        <p class="social-link-item">
          <a href="https://www.youtube.com/@영선갤러리" target="_blank" rel="noopener noreferrer">
            <BaseIcon name="youtube" width="18px" height="18px" class="social-icon"/>
            <span>YouTube: 영선갤러리 유튜브에서 많은 영상을 볼 수 있습니다.</span>
          </a>
        </p>
        <p class="social-link-item">
          <a href="https://open.kakao.com/o/gNPhwidf" target="_blank" rel="noopener noreferrer">
            <BaseIcon name="kakao" width="18px" height="18px" class="social-icon"/>
            <span>카카오톡: 영선갤러리 카카오톡에서 다양한 정보를 얻으실 수 있습니다.</span>
          </a>
        </p>
      </div>

      <p class="tech-info">
        본 사이트는 
        <img src="https://github.com/youngsungallery/website/blob/main/public/favicon_Vue.ico?raw=true" 
             alt="Vue.js icon" 
             style="vertical-align: middle; width: 1.1em; height: 1.1em; margin-right: 0.3em; margin-left: 0.3em; filter: invert(0) sepia(1) saturate(5) hue-rotate(90deg) brightness(1.5);">
        Vue.js으로 제작하였습니다.
      </p> 
      <!-- ✨ 노션 연동 테스트 문구 표시 ✨ -->
      <p class="notion-test-info">{{ notionTestMessage }}</p>
    </div>
  </footer>
</template>

<script setup>
import BaseIcon from '@/components/BaseIcon.vue';
import { ref, onMounted } from 'vue'; // ✨ ref와 onMounted 임포트 ✨

// ✨ Notion 테스트 메시지를 저장할 ref 생성 ✨
const notionTestMessage = ref('노션 연동 테스트 (로딩 중...)');

// ✨ 컴포넌트가 마운트될 때 JSON 파일 읽어오기 ✨
onMounted(async () => {
  try {
    // Actions가 생성할 public/data/footer-test-data.json 파일을 읽어옴
    const response = await fetch('/data/footer-test-data.json');
    const data = await response.json();
    notionTestMessage.value = data.notionTestMessage;
  } catch (error) {
    console.error('Failed to load Notion test data:', error);
    notionTestMessage.value = '노션 연동 테스트 (데이터 로드 실패)';
  }
});
</script>

<style lang="scss" scoped>
@use '../assets/styles/_appFooter.scss';
</style>