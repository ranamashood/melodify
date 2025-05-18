import { useFetch } from '@vueuse/core'
import type { Song } from './types/Song.interface'
import { watch } from 'vue'
import { store } from './store'

export const getImageUrl = (imagePath: string): string => {
  return `${import.meta.env.VITE_BASE_URL}/images/${encodeURIComponent(imagePath)}`
}

export const secToMin = (totalSeconds: number): string => {
  const minutes: number = Math.floor(totalSeconds / 60)
  const seconds: number = totalSeconds % 60
  const secondsStr: string = seconds < 10 ? `0${seconds}` : seconds.toString()

  return `${minutes}:${secondsStr}`
}

export const fetchSongs = (url: string) => {
  const {
    isFetching,
    error,
    data: songs,
  } = useFetch(`${import.meta.env.VITE_BASE_URL}/${url}`)
    .get()
    .json<Song[]>()

  watch(songs, (newSongs) => {
    store.songs = newSongs
  })

  return { isFetching, error, songs }
}

export const showContextMenu = (e: Event, songId: string) => {
  e.preventDefault()
  store.contextedSongId = songId

  document.addEventListener('click', () => {
    store.contextedSongId = ''
  })
}
