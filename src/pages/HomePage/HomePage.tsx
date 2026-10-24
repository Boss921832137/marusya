import { useState, useEffect } from 'react'
import { MovieCard } from '../../components/MovieCard/MovieCard'
import type { Movie } from '../../types/movie'
import { MovieBanner } from '../../components/MovieBanner/MovieBanner'
import { getRandomMovie, getTopMovies } from '../../api/movies'
import './HomePage.scss'

export function HomePage() {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null)
  const [topMovies, setTopMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loadRandomMovie = async () => {
    const loadedMovie = await getRandomMovie()
    setRandomMovie(loadedMovie)
  }

  useEffect(() => {
    const loadHomePageData = async () => {
      try {
        const loadedMovie = await getRandomMovie()
        setRandomMovie(loadedMovie)

        const loadedTopMovies = await getTopMovies()
        setTopMovies(loadedTopMovies)
      } catch {
        setErrorMessage('Не удалось загрузить фильмы. Попробуйте обновить страницу.')
      } finally {
        setIsLoading(false)
      }
    }
    loadHomePageData()
  }, [])

  return (
    <div className="container home-page">
      {isLoading && <p className="status-message">Загрузка...</p>}
      {errorMessage && <p className="status-message status-message--error">{errorMessage}</p>}
      {randomMovie && (
        <MovieBanner movie={randomMovie} hasDetailsLink onRefresh={loadRandomMovie} />
      )}
      <h2 className="home-page__top-title">Топ 10 фильмов</h2>
      <div className="home-page__top-list">
        {topMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterUrl={movie.posterUrl}
            rating={movie.tmdbRating}
          />
        ))}
      </div>
    </div>
  )
}
