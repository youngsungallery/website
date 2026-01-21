// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

export default createRouter({
  // ✅ Vite의 base(/ 또는 /website/)를 그대로 Router에 전달
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: '/', name: 'Home', component: Home },
  ],
})
