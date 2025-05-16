<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import SeekBar from '@/components/SongPlayer.vue'
import SongsList from '@/components/SongsList.vue'
</script>

<template>
  <div class="layout">
    <aside>
      <Sidebar />
    </aside>
    <main>
      <SongsList />
    </main>
    <SeekBar />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
}
main {
  flex: 1;
}
</style>
