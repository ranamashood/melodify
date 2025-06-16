<script setup lang="ts">
import { socket } from '@/socketio.service'
import { store } from '@/store'
import { ref } from 'vue'

const clients = ref<string[]>([])

socket.on('findAllClients', (newClients: string[]) => {
  clients.value = newClients
})
</script>

<template>
  <div class="sidebar" v-if="store.isInRoom">
    <div>Listeners</div>
    <div v-for="client in clients">{{ client }}</div>
  </div>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 10px;
}
</style>
