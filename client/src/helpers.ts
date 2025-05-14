export const getImageUrl = (imagePath: string): string => {
  return `${import.meta.env.VITE_BASE_URL}/images/${encodeURIComponent(imagePath)}`
}

export const secToMin = (totalSeconds: number): string => {
  const minutes: number = Math.floor(totalSeconds / 60)
  const seconds: number = totalSeconds % 60
  const secondsStr: string = seconds < 10 ? `0${seconds}` : seconds.toString()

  return `${minutes}:${secondsStr}`
}
