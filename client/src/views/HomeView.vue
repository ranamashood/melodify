<script setup lang="ts">
import SongsView from './SongsView.vue'
import { fetchSongs } from '@/helpers'

fetchSongs('songs')
</script>

<template>
  <SongsView />
</template>
