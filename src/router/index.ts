import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'
import PostView from '@/views/PostView.vue'
import SpecialPageView from '@/views/SpecialPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView,
    },
    {
      path: '/blog/:id',
      name: 'post',
      component: PostView,
    },
    {
      path: '/special_pages/:id',
      name: 'special_pages',
      component: SpecialPageView,
    },
  ],
})

export default router
