import { reactive } from 'vue'
import type { Song } from '@/types/Song.interface'
import type { Playlist } from './types/Playlist.interface'
import type { User } from './types/User.interface'

export const store = reactive<{
  user: User
  playlists: Playlist[] | null
  songs: Song[] | null
  currentSong: Song
  currentTime: number
  isPaused: boolean
  volume: number
  contextedSongId: string
  contextedType: '' | 'song' | 'queue'
  isInRoom: boolean
  queue: Song[]
}>({
  user: {} as User,
  playlists: [],
  songs: [],
  currentSong: {} as Song,
  currentTime: 0,
  isPaused: true,
  volume: 100,
  contextedSongId: '',
  contextedType: '',
  isInRoom: false,
  queue: [],
})
