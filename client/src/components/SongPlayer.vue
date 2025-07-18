<script setup lang="ts">
import { getImageUrl, secToMin, showContextMenu } from '@/helpers'
import { store } from '@/store'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import Slider from './Slider.vue'
import { useAudioPlayer } from '@/composables/audioPlayer'

const { playPrevious, playNext, playPause, setCurrentTime, setVolume } = useAudioPlayer()

const song = computed(() => store.currentSong)
const currentTime = computed(() => store.currentTime)
const currentTimeFormatted = computed(() => secToMin(currentTime.value))
const isPaused = computed(() => store.isPaused)
const volume = computed(() => store.volume)

const handleSeek = (e: Event) => {
  const input = e.currentTarget as HTMLInputElement
  const currentTime = parseInt(input.value)

  setCurrentTime(currentTime)
}

const handleVolume = (e: Event) => {
  const input = e.currentTarget as HTMLInputElement
  const volume = parseInt(input.value)

  setVolume(volume)
}

const previewCover = (coverPath: string) => {
  store.previewCoverPath = getImageUrl(coverPath)
}
</script>

<template>
  <div class="player">
    <div class="player__left">
      <div class="song__cover">
        <img
          class="song__image"
          v-if="song.imagePath"
          :src="getImageUrl(song.imagePath)"
          @click="previewCover(song.imagePath)"
        />
        <Icon class="song__icon" v-else icon="heroicons:musical-note-16-solid" />
      </div>
      <div v-if="song.title">
        <div class="song__title" @contextmenu="showContextMenu($event, song._id, 'song')">
          {{ song.title }}
        </div>
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
          <Icon class="player__icon" icon="heroicons:backward-20-solid" />
        </button>
        <button class="player__control player__pause" @click="playPause()">
          <Icon v-if="isPaused" class="player__icon" icon="heroicons:play-circle-20-solid" />
          <Icon v-else class="player__icon" icon="heroicons:pause-circle-20-solid" />
        </button>
        <button class="player__control" @click="playNext(song._id)">
          <Icon class="player__icon" icon="heroicons:forward-20-solid" />
        </button>
      </div>
      <div class="player__seekbar">
        <div class="player__duration">{{ currentTimeFormatted }}</div>
        <Slider :max="song.duration || 1" :value="currentTime" :width="500" @change="handleSeek" />
        <div class="player__duration">{{ song.durationFormatted }}</div>
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
  width: 97vw;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 30px;

  /* From https://css.glass */
  background: var(--secondary-300-alpha);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
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

.player__icon {
  color: var(--primary-950);
}

.player__pause {
  font-size: 2rem;
}

.player__duration {
  font-size: 0.8rem;
}

.player__seekbar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.song__cover {
  padding: 10px 0;
}

.song__image,
.song__icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  cursor: pointer;
}

.song__title:hover {
  text-decoration: underline;
  cursor: pointer;
}

.song__artists {
  color: var(--text-700);
  font-size: 0.9rem;
}

.song__duration {
  text-align: center;
}
</style>
