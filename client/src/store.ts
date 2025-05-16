import { reactive } from 'vue'
import type { Song } from '@/types/Song.interface'

export const store = reactive<{
  songs: Song[] | null
  currentSong: Song
  currentTime: number
  isPaused: boolean
  volume: number
}>({
  songs: [],
  currentSong: {} as Song,
  currentTime: 0,
  isPaused: true,
  volume: 100,
})
