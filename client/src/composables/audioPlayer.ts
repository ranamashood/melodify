import { store } from '@/store'

let audio: HTMLAudioElement | null = null

export function useAudioPlayer() {
  const getSongUrl = (songId: string) => {
    return `${import.meta.env.VITE_BASE_URL}/songs/${songId}/stream`
  }

  const play = (songId: string) => {
    if (audio) {
      audio.pause()
      audio.src = ''
      audio = null
    }

    const songUrl = getSongUrl(songId)
    audio = new Audio(songUrl)
    audio.play()
    audio.addEventListener('timeupdate', () => {
      store.currentTime = Math.floor(audio?.currentTime || 0)
    })
    store.isPaused = false
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
