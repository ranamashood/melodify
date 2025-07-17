<script setup lang="ts">
import { store } from '@/store'
import { useFetch } from '@/helpers'
import { useMouse } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { socket } from '@/socketio.service'

const contextedSongId = computed(() => store.contextedSongId)

const { x, y } = useMouse()

let mouseX = 0
let mouseY = 0
const isLiked = ref(false)
const songExistsInPlaylists = ref<boolean[]>([])

watch(contextedSongId, async (newContextedSongId) => {
  if (newContextedSongId) {
    mouseX = x.value
    mouseY = y.value

    const { data: likesData } = await useFetch(
      `${import.meta.env.VITE_BASE_URL}/likes/${newContextedSongId}`,
    )
      .get()
      .json()

    const { data: playlistSongsData } = await useFetch(
      `${import.meta.env.VITE_BASE_URL}/playlist-songs/song-exists/${newContextedSongId}`,
    )
      .get()
      .json()

    isLiked.value = !!likesData.value
    songExistsInPlaylists.value = playlistSongsData.value
  }
})

const toggleLike = async (songId: string) => {
  const { data } = await useFetch(`${import.meta.env.VITE_BASE_URL}/likes/${songId}`)
    .post()
    .json()

  if (!data.value.isLiked) {
    store.songs = store.songs.filter((song) => song._id !== songId)
  }
}

const addToPlaylist = async (playlistId: string, songId: string) => {
  const { data } = await useFetch(`${import.meta.env.VITE_BASE_URL}/playlist-songs`)
    .post({ playlistId, songId })
    .json()

  if (!data.value.isSongExists) {
    store.songs = store.songs.filter((song) => song._id !== songId)
  }
}

const addToQueue = (songId: string) => {
  const song = store.songs!.find((song) => song._id === songId)
  socket.emit('addToQueue', song!)
}

const removeFromQueue = (songId: string) => {
  socket.emit('removeFromQueue', songId)
}
</script>

<template>
  <div class="menu" v-if="contextedSongId" :style="{ left: `${mouseX}px`, top: `${mouseY}px` }">
    <template v-if="store.contextedType === 'song'">
      <button v-if="store.isInRoom" class="menu__item" @click="addToQueue(store.contextedSongId)">
        Add to queue
      </button>
      <button class="menu__item" @click="toggleLike(store.contextedSongId)">
        {{ isLiked ? 'Remove from liked songs' : 'Add to liked songs' }}
      </button>
      <button
        v-for="(playlist, index) in store.playlists"
        class="menu__item"
        @click="addToPlaylist(playlist._id, store.contextedSongId)"
      >
        {{ songExistsInPlaylists[index] ? 'Remove from' : 'Add to' }}
        {{ playlist.name }}
      </button>
    </template>
    <template v-if="store.contextedType === 'queue'">
      <button
        v-if="store.isInRoom"
        class="menu__item"
        @click="removeFromQueue(store.contextedSongId)"
      >
        Remove from queue
      </button>
    </template>
  </div>
</template>

<style scoped>
.menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  border: 2px solid var(--primary-500);
  background-color: var(--background-50);
  border-radius: 12px;
  z-index: 10;
}

.menu__item {
  color: inherit;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 6px;
  text-align: left;
  cursor: pointer;
}

.menu__item:hover {
  background-color: var(--primary-500);
}
</style>
