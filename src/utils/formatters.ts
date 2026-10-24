export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const restMinutes = minutes % 60
  return `${hours} ч ${restMinutes} мин`
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}
