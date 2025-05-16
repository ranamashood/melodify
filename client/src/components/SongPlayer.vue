<script setup lang="ts">
import { getImageUrl, secToMin } from '@/helpers'
import { store } from '@/store'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import Slider from './Slider.vue'
import { useAudioPlayer } from '@/composables/audioPlayer'

const { play, playPause, setCurrentTime, setVolume } = useAudioPlayer()

const song = computed(() => store.currentSong)
const currentTime = computed(() => store.currentTime)
const currentTimeFormatted = computed(() => secToMin(currentTime.value))
const isPaused = computed(() => store.isPaused)
const volume = computed(() => store.volume)

const handleSeek = (e: Event) => {
  const input = e.currentTarget as HTMLInputElement
  const currentTime = parseInt(input.value)

  store.currentTime = currentTime
  setCurrentTime(currentTime)
}

const handleVolume = (e: Event) => {
  const input = e.currentTarget as HTMLInputElement
  const volume = parseInt(input.value)

  setVolume(volume)
}

const playPrevious = (songId: string) => {
  if (!store.songs) {
    return
  }

  const songs = store.songs
  const currentIndex = songs.findIndex((song) => song._id === songId)
  const previousSong = songs[currentIndex - 1]

  play(previousSong)
}

const playNext = (songId: string) => {
  if (!store.songs) {
    return
  }

  const songs = store.songs
  const currentIndex = songs.findIndex((song) => song._id === songId)
  const nextSong = songs[currentIndex + 1]

  play(nextSong)
}
</script>

<template>
  <div class="player">
    <div class="player__left">
      <div class="song__cover">
        <img class="song__image" v-if="song.imagePath" :src="getImageUrl(song.imagePath)" />
        <Icon class="song__icon" v-else icon="heroicons:musical-note-16-solid" />
      </div>
      <div v-if="song.title">
        <div class="song__title">{{ song.title }}</div>
        <div class="song__artists">
          <span v-if="song.artists" v-for="(artist, index) in song.artists">
            <span>{{ artist }}</span>
            <span v-if="index !== song.artists?.length - 1">, </span>
          </span>
        </div>
      </div>
      <div class="song__filename" v-else>{{ song.filename }}</div>
    </div>
    <div class="player__center">
      <div class="player__controls">
        <button class="player__control" @click="playPrevious(song._id)">
          <Icon icon="heroicons:backward-20-solid" />
        </button>
        <button class="player__control player__pause" @click="playPause()">
          <Icon v-if="isPaused" icon="heroicons:play-circle-20-solid" />
          <Icon v-else icon="heroicons:pause-circle-20-solid" />
        </button>
        <button class="player__control" @click="playNext(song._id)">
          <Icon icon="heroicons:forward-20-solid" />
        </button>
      </div>
      <div class="player__seekbar">
        <div>{{ currentTimeFormatted }}</div>
        <Slider :max="song.duration || 0" :value="currentTime" :width="500" @change="handleSeek" />
        <div>{{ song.durationFormatted }}</div>
      </div>
    </div>
    <div class="player__right">
      <Slider :max="100" :value="volume" :width="100" @change="handleVolume" />
    </div>
  </div>
</template>

<style scoped>
.player {
  position: fixed;
  width: 100vw;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: grey;
  padding: 0 10px;
}

.player__left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.player__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.player__controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.player__control {
  display: flex;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1.2rem;
  cursor: pointer;
}

.player__pause {
  font-size: 2rem;
}

.player__seekbar {
  display: flex;
  gap: 10px;
}

.song:hover {
  background-color: grey;
  cursor: pointer;
}

.song__cover {
  padding: 10px 0;
}

.song__image,
.song__icon {
  width: 50px;
  height: 50px;
}

.song__duration {
  text-align: center;
}
</style>
