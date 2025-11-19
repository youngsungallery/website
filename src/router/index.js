import { createRouter, createWebHistory } from 'vue-router';
// HomeView.vue는 views 폴더에 있다고 명시적으로 임포트!
import HomeView from '@/views/HomeView.vue'; 

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;