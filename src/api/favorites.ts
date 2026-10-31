import { apiClient } from './apiClient'
import type { Movie } from '../types/movie'

export async function getFavorites(): Promise<Movie[]> {
  const response = await apiClient.get<Movie[]>('/favorites')
  return response.data
}

export async function addToFavorites(movieId: number): Promise<void> {
  await apiClient.post('/favorites', new URLSearchParams({ id: String(movieId) }))
}

export async function removeFromFavorites(movieId: number): Promise<void> {
  await apiClient.delete(`/favorites/${movieId}`)
}
