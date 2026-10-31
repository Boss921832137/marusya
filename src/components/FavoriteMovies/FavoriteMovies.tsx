import { useEffect, useState } from 'react'
import { getFavorites } from '../../api/favorites'
import type { Movie } from '../../types/movie'
import { MovieCard } from '../MovieCard/MovieCard'
import './FavoriteMovies.scss'

export function FavoriteMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteMovies = await getFavorites()
        setMovies(favoriteMovies)
      } catch {
        setErrorMessage('Не удалось загрузить избранное')
      } finally {
        setIsLoading(false)
      }
    }

    loadFavorites()
  }, [])

  if (isLoading) {
    return <p className="status-message">Загрузка...</p>
  }

  if (errorMessage) {
    return <p className="status-message status-message--error">{errorMessage}</p>
  }

  if (movies.length === 0) {
    return <p className="status-message">Вы пока ничего не добавили в избранное</p>
  }

  return (
    <div className="favorite-movies">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterUrl={movie.posterUrl}
          rating={movie.tmdbRating}
        />
      ))}
    </div>
  )
}
