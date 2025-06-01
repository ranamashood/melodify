<script setup lang="ts">
import { useRoute } from 'vue-router'
import SongsView from './SongsView.vue'
import { fetchSongs } from '@/helpers'
import { watch } from 'vue'

const route = useRoute()

fetchSongs(`playlist-songs/${route.params.id}`)

watch(route, () => {
  fetchSongs(`playlist-songs/${route.params.id}`)
})
</script>

<template>
  <SongsView />
</template>
