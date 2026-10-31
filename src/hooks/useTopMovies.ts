import { useEffect, useState } from 'react'
import { getTopMovies } from '../api/movies'
import type { Movie } from '../types/movie'

export function useTopMovies() {
  const [topMovies, setTopMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadTopMovies = async () => {
      try {
        setTopMovies(await getTopMovies())
      } catch {
        setErrorMessage('Не удалось загрузить топ фильмов. Попробуйте обновить страницу.')
      } finally {
        setIsLoading(false)
      }
    }

    loadTopMovies()
  }, [])

  return { topMovies, isLoading, errorMessage }
}
