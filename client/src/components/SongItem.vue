<script setup lang="ts">
import type { Song } from '@/types/Song.interface'
import { Icon } from '@iconify/vue'
import { useAudioPlayer } from '@/composables/audioPlayer'
import { getImageUrl, showContextMenu } from '@/helpers'
import { store } from '@/store'

defineProps<{
  song: Song
}>()

const { play } = useAudioPlayer()
</script>

<template>
  <tr
    class="song"
    :class="{ 'song--active': store.currentSong._id === song._id }"
    @click="play(song, true)"
    @contextmenu="showContextMenu($event, song._id, 'song')"
  >
    <td class="song__cover">
      <img class="song__image" v-if="song.thumbnailPath" :src="getImageUrl(song.thumbnailPath)" />
      <Icon class="song__icon" v-else icon="heroicons:musical-note-16-solid" />
    </td>
    <td v-if="song.title" class="song__details">
      <div class="song__title">{{ song.title }}</div>
      <div class="song__artists">
        <span v-if="song.artists" v-for="(artist, index) in song.artists">
          <span>{{ artist }}</span>
          <span v-if="index !== song.artists?.length - 1">, </span>
        </span>
      </div>
    </td>
    <td class="song__details song__filename" v-else>{{ song.filename }}</td>
    <td class="song__duration">{{ song.durationFormatted }}</td>
  </tr>
</template>

<style scoped>
td {
  padding: 0 10px;
}

.song:hover,
.song--active {
  background-color: var(--secondary-200);
  cursor: pointer;
}

.song__cover {
  padding: 10px;
}

.song__image,
.song__icon {
  width: 30px;
  height: 30px;
  border-radius: 6px;
}

.song__artists {
  color: var(--text-700);
  font-size: 0.9rem;
}

.song__details {
  width: 100%;
}

.song__duration {
  text-align: center;
}
</style>
