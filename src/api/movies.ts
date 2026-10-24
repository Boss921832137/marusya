import { apiClient } from './apiClient'
import type { Movie } from '../types/movie'

export async function getRandomMovie(): Promise<Movie> {
  const response = await apiClient.get<Movie>('/movie/random')
  return response.data
}

export async function getTopMovies(): Promise<Movie[]> {
  const response = await apiClient.get<Movie[]>('/movie/top10')
  return response.data
}

export async function getMovieById(movieId: string): Promise<Movie> {
  const response = await apiClient.get<Movie>(`/movie/${movieId}`)
  return response.data
}

export async function getGenres(): Promise<string[]> {
  const response = await apiClient.get<string[]>('/movie/genres')
  return response.data
}

export const MOVIES_PER_PAGE = 10

export async function getMoviesByGenre(genre: string, page: number): Promise<Movie[]> {
  const response = await apiClient.get<Movie[]>('/movie', {
    params: { genre, count: MOVIES_PER_PAGE, page },
  })
  return response.data
}

export const SEARCH_RESULTS_COUNT = 5

export async function searchMovies(title: string): Promise<Movie[]> {
  const response = await apiClient.get<Movie[]>('/movie', {
    params: { title, count: SEARCH_RESULTS_COUNT },
  })
  return response.data
}
