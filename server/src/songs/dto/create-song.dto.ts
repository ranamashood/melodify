export class CreateSongDto {
  title?: string;
  artist?: string;
  artists?: string[];
  duration?: number;
  durationFormatted?: string;
  imagePath?: string;
  thumbnailPath?: string;
  filename: string;
  mtimeMs: number;
}
