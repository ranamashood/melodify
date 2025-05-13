<script setup lang="ts">
import type { Song } from '@/types/Song.interface'
import { Icon } from '@iconify/vue'
import { useAudioPlayer } from '@/composables/audioPlayer'
import { store } from '@/store'

defineProps<{
  song: Song
}>()

const { play } = useAudioPlayer()

const getThumbnailUrl = (thumbnailPath: string): string => {
  return `${import.meta.env.VITE_BASE_URL}/images/${encodeURIComponent(thumbnailPath)}`
}

const playSong = (song: Song) => {
  store.currentSong = song
  play(song._id)
}
</script>

<template>
  <tr class="song" @click="playSong(song)">
    <td class="song__cover">
      <img
        class="song__image"
        v-if="song.thumbnailPath"
        :src="getThumbnailUrl(song.thumbnailPath)"
      />
      <Icon class="song__icon" v-else icon="heroicons:musical-note-16-solid" />
    </td>
    <td v-if="song.title">
      <div class="song__title">{{ song.title }}</div>
      <div class="song__artists">
        <span v-if="song.artists" v-for="(artist, index) in song.artists">
          <span>{{ artist }}</span>
          <span v-if="index !== song.artists?.length - 1">, </span>
        </span>
      </div>
    </td>
    <td class="song__filename" v-else>{{ song.filename }}</td>
    <td class="song__duration">{{ song.durationFormatted }}</td>
  </tr>
</template>

<style scoped>
.song:hover {
  background-color: grey;
  cursor: pointer;
}

.song__cover {
  padding: 10px 0;
}

.song__image,
.song__icon {
  width: 30px;
  height: 30px;
}

.song__duration {
  text-align: center;
}
</style>
