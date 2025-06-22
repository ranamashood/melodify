import { onMounted } from 'vue'
import { useAudioPlayer } from '@/composables/audioPlayer'

const { playPause, setCurrentTime } = useAudioPlayer()

export function useMediaSession() {
  const setDocumentTitle = (artist: string, title: string) => {
    document.title = `${artist} • ${title}`
  }

  const setMediaMetadata = (artist: string, title: string, artwork: string) => {
    setDocumentTitle(artist, title)

    navigator.mediaSession.metadata = new MediaMetadata({
      artist,
      title,
      artwork: [
        {
          src: artwork,
        },
      ],
    })

    const actionHandlers: Array<[MediaSessionAction, MediaSessionActionHandler]> = [
      [
        'play',
        () => {
          playPause()
          navigator.mediaSession.playbackState = 'playing'
        },
      ],
      [
        'pause',
        () => {
          playPause()
          navigator.mediaSession.playbackState = 'paused'
        },
      ],
      [
        'seekto',
        ({ seekTime }) => {
          setCurrentTime(seekTime!)
          navigator.mediaSession.setPositionState({
            position: seekTime,
          })
        },
      ],
    ]

    for (const [action, handler] of actionHandlers) {
      try {
        navigator.mediaSession.setActionHandler(action, handler)
      } catch (error) {
        console.log(`The media session action "${action}" is not supported yet.`)
      }
    }
  }

  onMounted(() => {})

  return {
    setMediaMetadata,
  }
}
