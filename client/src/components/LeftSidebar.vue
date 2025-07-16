<script setup lang="ts">
import { useFetch } from '@/helpers'
import { type Playlist } from '@/types/Playlist.interface'
import { useRoute, useRouter } from 'vue-router'
import { computed, watch } from 'vue'
import { store } from '@/store'
import { socket } from '@/socketio.service'
import { Icon } from '@iconify/vue'

const route = useRoute()
const router = useRouter()

const activeRoute = computed(() => route.path)

const {
  isFetching,
  error,
  data: playlists,
  execute: fetchPlaylists,
} = useFetch(`${import.meta.env.VITE_BASE_URL}/playlists`)
  .get()
  .json<Playlist[]>()

watch(playlists, (newPlaylists) => {
  store.playlists = newPlaylists
})

const createPlaylist = async () => {
  const name = prompt('Enter playlist name:')

  if (name) {
    await useFetch(`${import.meta.env.VITE_BASE_URL}/playlists`).post({ name })
    fetchPlaylists()
  }
}

const goToHome = () => {
  router.push({ name: 'home' })
}

const goToLikedSongs = () => {
  router.push({ name: 'likedSongs' })
}

const goToPlaylist = (id: string) => {
  router.push({ name: 'playlist', params: { id } })
}

const goToGenres = () => {
  router.push({ name: 'genre' })
}

const joinRoom = () => {
  socket.connect()
  store.isInRoom = true
  socket.emit('createClient', store.user.username)
}

const leaveRoom = () => {
  socket.disconnect()
  store.isInRoom = false
}
</script>

<template>
  <div class="sidebar">
    <button v-if="!store.isInRoom" class="sidebar__button" @click="joinRoom()">
      <Icon class="sidebar__icon" icon="heroicons:arrow-right-end-on-rectangle-16-solid" />
      Join Room
    </button>
    <button v-else class="sidebar__button sidebar__button--active" @click="leaveRoom()">
      <Icon class="sidebar__icon" icon="heroicons:arrow-left-start-on-rectangle-16-solid" />
      Leave Room
    </button>
    <button class="sidebar__button" @click="createPlaylist()">
      <Icon class="sidebar__icon" icon="heroicons:list-bullet-16-solid" />
      Create new playlist
    </button>
    <button
      class="sidebar__button"
      :class="{ 'sidebar__button--active': activeRoute === '/' }"
      @click="goToHome()"
    >
      <Icon class="sidebar__icon" icon="heroicons:musical-note-16-solid" />
      All Songs
    </button>
    <button
      class="sidebar__button"
      :class="{ 'sidebar__button--active': activeRoute === '/genre' }"
      @click="goToGenres()"
    >
      <Icon class="sidebar__icon" icon="heroicons:rectangle-group-16-solid" />
      Genres
    </button>
    <button
      class="sidebar__button"
      :class="{ 'sidebar__button--active': activeRoute === '/liked-songs' }"
      @click="goToLikedSongs()"
    >
      <Icon class="sidebar__icon" icon="heroicons:heart-16-solid" />
      Liked Songs
    </button>
    <button
      v-for="playlist in playlists"
      class="sidebar__button"
      @click="goToPlaylist(playlist._id)"
    >
      {{ playlist.name }}
    </button>
  </div>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 10px;
}

.sidebar__icon {
  font-size: 1.2rem;
}

.sidebar__button {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--text-800);
  background-color: transparent;
  font-size: inherit;
  text-align: left;
  width: 100%;
  border: none;
  outline: none;
  padding: 10px;
  cursor: pointer;
  transition: all 300ms;
}

.sidebar__button:hover {
  color: var(--text-950);
}

.sidebar__button--active {
  color: var(--text-950);
  font-weight: 600;
}
</style>
