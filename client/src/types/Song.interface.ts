export interface Song {
  _id: string
  title?: string
  artist?: string
  artists?: string[]
  duration?: number
  durationFormatted?: string
  imagePath?: string
  thumbnailPath?: string
  filename: string
  birthtimeMs: number
}
