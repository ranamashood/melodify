<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import type { Song } from '@/types/Song.interface'
import { Icon } from '@iconify/vue'

const {
  isFetching,
  error,
  data: songs,
} = useFetch(`${import.meta.env.VITE_BASE_URL}/songs`)
  .get()
  .json<Song[]>()

const getThumbnailUrl = (thumbnailPath: string): string => {
  return `${import.meta.env.VITE_BASE_URL}/images/${encodeURIComponent(thumbnailPath)}`
}
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
      <tr class="song" v-for="song in songs">
        <td class="song__cover">
          <img
            class="song__image"
            v-if="song.thumbnailPath"
            :src="getThumbnailUrl(song.thumbnailPath)"
          />
          <Icon :key="song._id" class="song__icon" v-else icon="heroicons:musical-note-16-solid" />
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
