<script setup lang="ts">
import { fetchSongs } from '@/helpers'
import { useFetch } from '@vueuse/core'
import { type Playlist } from '@/types/Playlist.interface'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import { store } from '@/store'

const router = useRouter()

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

  await useFetch(`${import.meta.env.VITE_BASE_URL}/playlists`).post({ name })
  fetchPlaylists()
}

const goToPlaylist = (id: string) => {
  router.push({ name: 'playlist', params: { id } })
}
</script>

<template>
  <div class="sidebar">
    <button class="sidebar__button" @click="createPlaylist()">Create new playlist</button>
    <button class="sidebar__button" @click="fetchSongs('songs')">All Songs</button>
    <button class="sidebar__button" @click="fetchSongs('likes')">Liked Songs</button>
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

.sidebar__button {
  width: 100%;
  border: none;
  outline: none;
  padding: 10px 0;
  border-radius: 10px;
  cursor: pointer;
}
</style>
