import { MovieCard } from '../../components/MovieCard/MovieCard'
import { MovieBanner } from '../../components/MovieBanner/MovieBanner'
import { useRandomMovie } from '../../hooks/useRandomMovie'
import { useTopMovies } from '../../hooks/useTopMovies'
import './HomePage.scss'

export function HomePage() {
  const { randomMovie, loadRandomMovie } = useRandomMovie()
  const { topMovies, isLoading, errorMessage } = useTopMovies()

  return (
    <div className="container home-page">
      {randomMovie && (
        <MovieBanner movie={randomMovie} hasDetailsLink onRefresh={loadRandomMovie} />
      )}
      <h2 className="home-page__top-title">Топ 10 фильмов</h2>
      {isLoading && <p className="status-message">Загрузка...</p>}
      {errorMessage && <p className="status-message status-message--error">{errorMessage}</p>}
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
