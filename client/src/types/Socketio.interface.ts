export interface ClientToServerEvents {
  createClient: (username: string) => void

  play: (songId?: string) => void
  pause: () => void
  seek: (time: number) => void
}

export interface ServerToClientEvents {
  findAllClients: (clients: string[]) => void

  play: (songId?: string) => void
  pause: () => void
  seek: (time: number) => void
}
