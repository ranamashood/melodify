export class CreateSongDto {
  title?: string;
  artist?: string;
  artists?: string[];
  duration?: number;
  imagePath?: string;
  thumbnailPath?: string;
  filename: string;
  birthtimeMs: number;
}
