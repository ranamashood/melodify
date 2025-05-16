import { store } from '@/store'
import type { Song } from '@/types/Song.interface'

let audio: HTMLAudioElement | null = null

export function useAudioPlayer() {
  const getSongUrl = (songId: string) => {
    return `${import.meta.env.VITE_BASE_URL}/songs/${songId}/stream`
  }

  const play = (song: Song) => {
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
  }

  const playPause = () => {
    if (!audio) {
      return
    }

    if (audio.paused) {
      audio.play()
      store.isPaused = false
    } else {
      audio.pause()
      store.isPaused = true
    }
  }

  const setCurrentTime = (currentTime: number) => {
    if (!audio) {
      return
    }

    audio.currentTime = currentTime
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
    setCurrentTime,
    setVolume,
  }
}
