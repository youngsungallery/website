// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/views/MainLayout.vue';
import HomeView from '@/views/HomeView.vue'; // 나중에 만들 HomeView 컴포넌트를 가정

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout, // 메인 레이아웃을 부모 컴포넌트로 사용
      children: [
        {
          path: '', // 기본 경로 (예: /)
          name: 'home',
          component: HomeView // HomeView를 메인 레이아웃 안에 렌더링
        },
        // ⭐⭐⭐ /exhibitions 경로 추가 ⭐⭐⭐
        {
          path: 'exhibitions',
          name: 'exhibitions',
          // 컴포넌트는 나중에 src/exhibitions/views/ExhibitionListView.vue 로 연결 예정
          component: () => import('@/views/NotFoundView.vue') // 임시 컴포넌트 또는 404 페이지로 연결
        },
        // ⭐⭐⭐ /artworks 경로 추가 ⭐⭐⭐
        {
          path: 'artworks',
          name: 'artworks',
          // 컴포넌트는 나중에 src/artworks/views/ArtworkListView.vue 로 연결 예정
          component: () => import('@/views/NotFoundView.vue') // 임시 컴포넌트 또는 404 페이지로 연결
        },
        // ⭐⭐⭐ /lectures, /about 경로도 있다면 추가 ⭐⭐⭐
        {
          path: 'lectures',
          name: 'lectures',
          component: () => import('@/views/NotFoundView.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/NotFoundView.vue')
        }
      ]
    },
    // 모든 매치되지 않는 경로를 처리하는 404 라우트
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFoundView.vue') }
  ]
});

export default router;