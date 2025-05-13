<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import type { Song } from '@/types/Song.interface'
import SongItem from './SongItem.vue'

const {
  isFetching,
  error,
  data: songs,
} = useFetch(`${import.meta.env.VITE_BASE_URL}/songs`)
  .get()
  .json<Song[]>()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th class="song__duration">Duration</th>
      </tr>
    </thead>
    <tbody>
      <SongItem v-for="song in songs" :key="song._id" :song="song" />
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
}

th {
  text-align: left;
}
</style>
