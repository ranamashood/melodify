import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlaylistView from '@/views/PlaylistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      name: 'likedSongs',
      path: '/liked-songs',
      component: HomeView,
      props: { isLikedSongs: true },
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: PlaylistView,
    },
  ],
})

export default router
