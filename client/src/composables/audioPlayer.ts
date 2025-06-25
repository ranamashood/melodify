import { socket } from '@/socketio.service'
import { store } from '@/store'
import type { Song } from '@/types/Song.interface'
import { watch } from 'vue'
import { useMediaSession } from '@/composables/mediaSession'
import { getImageUrl } from '@/helpers'

const { setMediaMetadata } = useMediaSession()

let audio: HTMLAudioElement | null = null

export function useAudioPlayer() {
  socket.on('play', (song?: Song) => {
    if (!song) {
      store.isPaused = false
      return
    }

    play(song)
  })

  socket.on('pause', () => {
    store.isPaused = true
  })

  socket.on('seek', (time: number) => {
    if (audio) {
      audio.currentTime = time
    }

    store.currentTime = time
  })

  watch(
    () => store.isPaused,
    (isPaused) => {
      isPaused ? audio?.pause() : audio?.play()
    },
  )

  const getSongUrl = (songId: string) => {
    return `${import.meta.env.VITE_BASE_URL}/songs/${songId}/stream`
  }

  const play = (song: Song, emit = false) => {
    if (audio) {
      audio.pause()
      audio.src = ''
      audio = null
    }

    const songUrl = getSongUrl(song._id)
    audio = new Audio(songUrl)
    audio.play()
    audio.addEventListener('timeupdate', () => {
      store.currentTime = Math.floor(audio?.currentTime || 0)
    })
    store.isPaused = false
    store.currentSong = song

    if (emit && store.isInRoom) {
      socket.emit('play', song)
    }

    setMediaMetadata(song.artist!, song.title!, getImageUrl(song.imagePath!))
  }

  const playPause = () => {
    store.isPaused = !store.isPaused

    if (store.isInRoom) {
      store.isPaused ? socket.emit('pause') : socket.emit('play')
    }
  }

  const playPrevious = (songId: string) => {
    if (!store.songs) {
      return
    }

    const songs = store.songs
    const currentIndex = songs.findIndex((song) => song._id === songId)
    const previousSong = songs[currentIndex - 1]

    play(previousSong, store.isInRoom)
  }

  const playNext = (songId: string) => {
    if (!store.songs) {
      return
    }

    const songs = store.songs
    const currentIndex = songs.findIndex((song) => song._id === songId)
    const nextSong = songs[currentIndex + 1]

    play(nextSong, store.isInRoom)
  }

  const setCurrentTime = (currentTime: number) => {
    if (!audio) {
      return
    }

    audio.currentTime = currentTime
    store.currentTime = currentTime

    if (store.isInRoom) {
      socket.emit('seek', currentTime)
    }
  }

  const setVolume = (volume: number) => {
    if (!audio) {
      return
    }

    audio.volume = volume / 100
    store.volume = volume
  }

  return {
    play,
    playPause,
    playPrevious,
    playNext,
    setCurrentTime,
    setVolume,
  }
}
