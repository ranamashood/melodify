<script setup lang="ts">
import { fetchSongs } from '@/helpers'
</script>

<template>
  <div class="sidebar">
    <button class="sidebar__button" @click="fetchSongs('songs')">All Songs</button>
    <button class="sidebar__button">Liked Songs</button>
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
