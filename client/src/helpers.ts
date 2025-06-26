import { createFetch } from '@vueuse/core'
import type { Song } from './types/Song.interface'
import { watch } from 'vue'
import { store } from './store'

export const useFetch = createFetch({
  baseUrl: import.meta.env.VITE_BASE_URL,
  options: {
    async beforeFetch({ options }: { options: any }) {
      const token = localStorage.getItem('token')
      if (token) {
        options.headers.Authorization = `Bearer ${token}`
      }

      return { options }
    },

    async onFetchError({ response, error }) {
      if (response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }

      return { response, error }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})

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

export const showContextMenu = (e: Event, songId: string, contextedType: 'song' | 'queue') => {
  e.preventDefault()
  store.contextedSongId = songId
  store.contextedType = contextedType

  document.addEventListener('click', () => {
    store.contextedSongId = ''
  })
}

export const logout = () => {
  localStorage.removeItem('token')
}
