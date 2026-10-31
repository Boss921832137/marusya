import { useParams } from 'react-router'
import { genreTitles } from '../../constants/genreTitles'
import { MovieCard } from '../../components/MovieCard/MovieCard'
import { useGenreMovies } from '../../hooks/useGenreMovies'
import './GenrePage.scss'

export function GenrePage() {
  const { genreName } = useParams()
  const genreTitle = genreName ? (genreTitles[genreName] ?? genreName) : 'Жанр'
  const { movies, isLoading, errorMessage, listEndRef } = useGenreMovies(genreName)

  return (
    <div className="container genre-page">
      <h1 className="genre-page__title">{genreTitle}</h1>
      {errorMessage && <p className="status-message status-message--error">{errorMessage}</p>}
      <div className="genre-page__list">
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
      <div className="genre-page__list-end" ref={listEndRef} />
      {isLoading && <p className="status-message">Загрузка...</p>}
    </div>
  )
}
