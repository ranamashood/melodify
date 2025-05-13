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
  }

  return {
    play,
  }
}
