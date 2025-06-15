export interface ClientToServerEvents {
  play: (songId?: string) => void
  pause: () => void
  seek: (time: number) => void
}

export interface ServerToClientEvents {
  play: (songId?: string) => void
  pause: () => void
  seek: (time: number) => void
}
