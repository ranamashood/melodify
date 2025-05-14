import { reactive } from 'vue'
import type { Song } from '@/types/Song.interface'

export const store = reactive<{
  currentSong: Song
  currentTime: number
  isPaused: boolean
  volume: number
}>({
  currentSong: {} as Song,
  currentTime: 0,
  isPaused: true,
  volume: 100,
})
