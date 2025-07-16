import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlaylistView from '@/views/PlaylistView.vue'
import AuthView from '@/views/AuthView.vue'
import GenresView from '@/views/GenresView.vue'
import GenreView from '@/views/GenreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: AuthView,
    },
    {
      path: '/register',
      name: 'register',
      component: AuthView,
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
    {
      path: '/genre',
      name: 'genre',
      component: GenresView,
    },
    {
      path: '/genre/:name',
      name: 'genrePage',
      component: GenreView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')

  if (to.name !== 'login' && to.name !== 'register' && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
