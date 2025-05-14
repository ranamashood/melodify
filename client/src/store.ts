import { reactive } from 'vue'
import type { Song } from '@/types/Song.interface'

export const store = reactive<{
  currentSong: Song
  currentTime: number
}>({
  currentSong: {} as Song,
  currentTime: 0,
})
