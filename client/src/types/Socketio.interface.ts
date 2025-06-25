import type { Song } from './Song.interface'

export interface ClientToServerEvents {
  createClient: (username: string) => void

  play: (song?: Song) => void
  pause: () => void
  seek: (time: number) => void
}

export interface ServerToClientEvents {
  findAllClients: (clients: string[]) => void

  play: (song?: Song) => void
  pause: () => void
  seek: (time: number) => void
}
