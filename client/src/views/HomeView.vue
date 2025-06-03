<script setup lang="ts">
import { useRoute } from 'vue-router'
import SongsView from './SongsView.vue'
import { fetchSongs } from '@/helpers'
import { watch } from 'vue'

const props = defineProps<{
  isLikedSongs?: boolean
}>()

const route = useRoute()

fetchSongs(props?.isLikedSongs ? 'likes' : 'songs')

watch(route, () => {
  fetchSongs(props?.isLikedSongs ? 'likes' : 'songs')
})
</script>

<template>
  <SongsView />
</template>
