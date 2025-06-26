import type { Song } from './Song.interface'

export interface ClientToServerEvents {
  createClient: (username: string) => void

  play: (song?: Song) => void
  pause: () => void
  seek: (time: number) => void

  addToQueue: (song: Song) => void
  removeFromQueue: (songId: string) => void
}

export interface ServerToClientEvents {
  findAllClients: (clients: string[]) => void

  play: (song?: Song) => void
  pause: () => void
  seek: (time: number) => void

  getQueue: (queue: Song[]) => void
}
