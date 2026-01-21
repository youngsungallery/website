<template>
  <div class="layout-root">
    <header class="site-header">
      <div class="header-inner">
        <RouterLink to="/" class="brand">영선갤러리</RouterLink>

        <nav class="menu">
          <RouterLink class="menu-item" to="/exhibitions">전시</RouterLink>
          <RouterLink class="menu-item" to="/works">작품</RouterLink>
        </nav>
      </div>
    </header>

    <main class="site-main">
      <div class="main-inner">
        <slot />
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import SiteFooter from "@/components/layout/SiteFooter.vue";
</script>

<style scoped>
/* ===============================
   Base Layout
=============================== */
.layout-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #111;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
}

/* ===============================
   Header
=============================== */
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.header-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Brand */
.brand {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #111;
  text-decoration: none;
}

/* Menu */
.menu {
  display: flex;
  align-items: center;
  gap: 22px;
}

.menu-item {
  font-size: 13px;
  letter-spacing: 0.06em;
  color: #333;
  text-decoration: none;
  opacity: 0.85;
  padding: 4px 2px;
}

.menu-item:hover {
  opacity: 1;
}

.menu-item.router-link-active {
  opacity: 1;
  font-weight: 600;
}

/* ===============================
   Main
=============================== */
.site-main {
  flex: 1;
  width: 100%;
}

.main-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 36px 20px 96px;
}
</style>
