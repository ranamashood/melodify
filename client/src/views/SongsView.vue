<script setup lang="ts">
import LeftSidebar from '@/components/LeftSidebar.vue'
import RightSidebar from '@/components/RightSidebar.vue'
import SeekBar from '@/components/SongPlayer.vue'
import SongsList from '@/components/SongsList.vue'
</script>

<template>
  <div class="layout">
    <aside>
      <LeftSidebar />
    </aside>
    <main>
      <SongsList />
    </main>
    <aside>
      <RightSidebar />
    </aside>
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
