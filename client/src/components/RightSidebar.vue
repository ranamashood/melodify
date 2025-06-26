<script setup lang="ts">
import { useAudioPlayer } from '@/composables/audioPlayer'
import { getImageUrl, showContextMenu } from '@/helpers'
import { socket } from '@/socketio.service'
import { store } from '@/store'
import type { Song } from '@/types/Song.interface'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const { play } = useAudioPlayer()

const clients = ref<string[]>([])

socket.on('findAllClients', (newClients: string[]) => {
  clients.value = newClients
})

socket.on('getQueue', (newQueue: Song[]) => {
  store.queue = newQueue
})

const playFromQueue = (song: Song) => {
  socket.emit('removeFromQueue', song._id)
  play(song, true)
}
</script>

<template>
  <div class="sidebar" v-if="store.isInRoom">
    <div>Listeners</div>
    <div v-for="client in clients">{{ client }}</div>
    <template v-if="store.queue.length">
      <div>Queue</div>
      <div
        v-for="song in store.queue"
        class="song"
        @click="playFromQueue(song)"
        @contextmenu="showContextMenu($event, song._id, 'queue')"
      >
        <div class="song__cover">
          <img
            class="song__image"
            v-if="song.thumbnailPath"
            :src="getImageUrl(song.thumbnailPath)"
          />
          <Icon class="song__icon" v-else icon="heroicons:musical-note-16-solid" />
        </div>
        <div v-if="song.title" class="song__details">
          <div class="song__title">{{ song.title }}</div>
          <div class="song__artists">
            <span v-if="song.artists" v-for="(artist, index) in song.artists">
              <span>{{ artist }}</span>
              <span v-if="index !== song.artists?.length - 1">, </span>
            </span>
          </div>
        </div>
        <div class="song__details song__filename" v-else>{{ song.filename }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 10px;
}

.song {
  display: flex;
  align-items: center;
}

.song:hover {
  background-color: var(--secondary-200);
  cursor: pointer;
}

.song__cover {
  padding: 10px;
}

.song__image,
.song__icon {
  width: 35px;
  height: 35px;
  border-radius: 6px;
}

.song__artists {
  color: var(--text-700);
  font-size: 0.9rem;
}
</style>
