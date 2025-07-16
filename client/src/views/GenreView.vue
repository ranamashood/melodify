<script setup lang="ts">
import { useRoute } from 'vue-router'
import SongsView from './SongsView.vue'
import { fetchSongs } from '@/helpers'
import { watch } from 'vue'

const route = useRoute()

fetchSongs(`genres/${route.params.name}`)

watch(route, () => {
  fetchSongs(`genres/${route.params.name}`)
})
</script>

<template>
  <SongsView />
</template>
