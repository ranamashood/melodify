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

    audio.volume = volume
  }

  const getVolume = (): number => {
    if (!audio) {
      return 100
    }

    return audio.volume
  }

  return {
    play,
    setCurrentTime,
    setVolume,
    getVolume,
  }
}
