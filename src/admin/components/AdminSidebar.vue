<!-- src/admin/components/AdminSidebar.vue -->
<template>
  <aside class="admin-sidebar">
    <div class="sidebar-logo">
      <p class="logo-text">MENU</p>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <!-- ⭐⭐⭐ exact-active-class="router-link-exact-active" 추가 ⭐⭐⭐ -->
        <li>
          <router-link to="/admin" exact-active-class="router-link-exact-active">
            대시보드
          </router-link>
        </li>
        <li>
          <router-link to="/admin/exhibitions" exact-active-class="router-link-exact-active">
            전시 관리
          </router-link>
        </li>
        <li>
          <router-link to="/admin/artworks" exact-active-class="router-link-exact-active">
            작품 관리
          </router-link>
        </li>
        <li>
          <router-link to="/admin/settings" exact-active-class="router-link-exact-active">
            설정
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
// 사이드바에 필요한 스크립트 로직 (현재는 비어 있음)
</script>

<style scoped lang="scss">
@use '@/admin/styles/AdminSidebar.scss';
</style>