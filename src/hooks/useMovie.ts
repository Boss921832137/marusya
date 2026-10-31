import { useEffect, useState } from 'react'
import { getMovieById } from '../api/movies'
import type { Movie } from '../types/movie'

export function useMovie(movieId: string | undefined) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!movieId) {
      return
    }

    const loadMovie = async () => {
      try {
        setMovie(await getMovieById(movieId))
      } catch {
        setErrorMessage('Не удалось загрузить фильм')
      } finally {
        setIsLoading(false)
      }
    }

    loadMovie()
  }, [movieId])

  return { movie, isLoading, errorMessage }
}
