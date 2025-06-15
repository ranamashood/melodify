import { reactive } from 'vue'
import type { Song } from '@/types/Song.interface'
import type { Playlist } from './types/Playlist.interface'

export const store = reactive<{
  playlists: Playlist[] | null
  songs: Song[] | null
  currentSong: Song
  currentTime: number
  isPaused: boolean
  volume: number
  contextedSongId: string
  isInRoom: boolean
}>({
  playlists: [],
  songs: [],
  currentSong: {} as Song,
  currentTime: 0,
  isPaused: true,
  volume: 100,
  contextedSongId: '',
  isInRoom: false,
})
