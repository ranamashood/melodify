<script setup lang="ts">
import { store } from '@/store'
import { useFetch, useMouse } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

const contextedSongId = computed(() => store.contextedSongId)

const { x, y } = useMouse()

let mouseX = 0
let mouseY = 0
const isLiked = ref(false)

watch(contextedSongId, async (newContextedSongId) => {
  if (newContextedSongId) {
    mouseX = x.value
    mouseY = y.value

    const { data } = await useFetch(`${import.meta.env.VITE_BASE_URL}/likes/${newContextedSongId}`)
      .get()
      .json()

    isLiked.value = !!data.value
  }
})

const toggleLike = async (songId: string) => {
  await useFetch(`${import.meta.env.VITE_BASE_URL}/likes/${songId}`).post()
}
</script>

<template>
  <div class="menu" v-if="contextedSongId" :style="{ left: `${mouseX}px`, top: `${mouseY}px` }">
    <button class="menu__item" @click="toggleLike(store.contextedSongId)">
      {{ isLiked ? 'Remove from liked songs' : 'Add to liked songs' }}
    </button>
  </div>
</template>

<style scoped>
.menu {
  position: absolute;
  display: flex;
  border: 1px solid black;
  border-radius: 12px;
}

.menu__item {
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
}
</style>
