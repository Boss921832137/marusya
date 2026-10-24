import type { Movie } from '../types/movie'

export function sortMoviesByRating(movies: Movie[]): Movie[] {
  return [...movies].sort((first, second) => second.tmdbRating - first.tmdbRating)
}
