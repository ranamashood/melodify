<script setup lang="ts">
import { store } from '@/store'
import SongItem from './SongItem.vue'
import { computed } from 'vue'
import ContextMenu from './ContextMenu.vue'

const songs = computed(() => store.songs)
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
  <ContextMenu />
</template>

<style scoped>
table {
  width: 100%;
}

th {
  padding: 0 10px;
  text-align: left;
}

.song__duration {
  text-align: center;
}
</style>
