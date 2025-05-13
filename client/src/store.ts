import { reactive } from 'vue'
import type { Song } from '@/types/Song.interface'

export const store = reactive<{
  currentSong: Song
}>({
  currentSong: {} as Song,
})
