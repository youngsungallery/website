<template>
  <footer class="app-footer">
    <div class="footer-bottom">
      <div class="footer-top-line">
        <h3>Youngsungallery 영선갤러리</h3>
        <p class="copyright">&copy; 2025 Youngsun Gallery. All rights reserved.</p> 
      </div>
      
      <div class="social-section">
        <p class="social-heading">social</p>
        <p class="social-link-item">
          <a href="https://www.youtube.com/@영선갤러리" target="_blank" rel="noopener noreferrer">
            YouTube: 영선갤러리 유튜브에서 많은 영상을 볼 수 있습니다.
          </a>
        </p>
        <p class="social-link-item">
          <a href="https://open.kakao.com/o/gNPhwidf" target="_blank" rel="noopener noreferrer">
            카카오톡: 영선갤러리 카카오톡에서 다양한 정보를 얻으실 수 있습니다.
          </a>
        </p>
      </div>

      <p class="tech-info">
        본 사이트는 
        <img src="https://github.com/youngsungallery/website/blob/main/public/favicon_Vue.ico?raw=true" 
             alt="Vue.js icon" 
             style="vertical-align: middle; width: 1.1em; height: 1.1em; margin-right: 0.3em; margin-left: 0.3em;">
        Vue.js으로 제작하였습니다.
      </p> 
    </div>
  </footer>
</template>

<script setup>
// 푸터 컴포넌트에는 특별히 복잡한 스크립트 로직이 필요 없어!
</script>

<style lang="scss" scoped>
@use '../assets/styles/_appFooter.scss';
</style>