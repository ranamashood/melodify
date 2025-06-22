<script setup lang="ts">
import { store } from '@/store'
import { useFetch } from '@/helpers'
import { useMouse } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

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
  await useFetch(`${import.meta.env.VITE_BASE_URL}/likes/${songId}`).post()
}

const addToPlaylist = (playlistId: string, songId: string) => {
  useFetch(`${import.meta.env.VITE_BASE_URL}/playlist-songs`).post({ playlistId, songId })
}
</script>

<template>
  <div class="menu" v-if="contextedSongId" :style="{ left: `${mouseX}px`, top: `${mouseY}px` }">
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
