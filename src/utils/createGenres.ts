import { genreTitles } from '../constants/genreTitles'
import type { Genre } from '../types/genre'

export function createGenres(genreNames: string[]): Genre[] {
  return genreNames.map((name) => ({
    name,
    title: genreTitles[name] ?? name,
  }))
}
