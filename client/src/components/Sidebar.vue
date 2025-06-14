<script setup lang="ts">
import { useFetch } from '@/helpers'
import { type Playlist } from '@/types/Playlist.interface'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import { store } from '@/store'
import { socket } from '@/socketio.service'

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

const joinRoom = () => {
  socket.connect()
  store.isInRoom = true
}

const leaveRoom = () => {
  socket.disconnect()
  store.isInRoom = false
}
</script>

<template>
  <div class="sidebar">
    <button v-if="!store.isInRoom" class="sidebar__button" @click="joinRoom()">Join Room</button>
    <button v-else class="sidebar__button" @click="leaveRoom()">Leave Room</button>
    <button class="sidebar__button" @click="createPlaylist()">Create new playlist</button>
    <button class="sidebar__button" @click="goToHome()">All Songs</button>
    <button class="sidebar__button" @click="goToLikedSongs()">Liked Songs</button>
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
