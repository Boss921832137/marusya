import { Fragment } from 'react'
import { useParams } from 'react-router'
import { MovieBanner } from '../../components/MovieBanner/MovieBanner'
import { useMovie } from '../../hooks/useMovie'
import './MoviePage.scss'

export function MoviePage() {
  const { movieId } = useParams()
  const { movie, isLoading, errorMessage } = useMovie(movieId)

  if (isLoading) {
    return <p className="container status-message">Загрузка...</p>
  }

  if (errorMessage) {
    return <p className="container status-message status-message--error">{errorMessage}</p>
  }

  if (!movie) {
    return null
  }

  const movieDetails = [
    { name: 'Язык оригинала', value: movie.language },
    { name: 'Бюджет', value: movie.budget },
    { name: 'Выручка', value: movie.revenue },
    { name: 'Режиссёр', value: movie.director },
    { name: 'Продакшен', value: movie.production },
    { name: 'Награды', value: movie.awardsSummary },
  ]

  const filledMovieDetails = movieDetails.filter((detail) => detail.value)

  return (
    <div className="container movie-page">
      <MovieBanner movie={movie} />
      <section className="movie-page__about">
        <h2 className="movie-page__about-title">О фильме</h2>
        <dl className="movie-page__details">
          {filledMovieDetails.map((detail) => (
            <Fragment key={detail.name}>
              <dt className="movie-page__detail-name">{detail.name}</dt>
              <dd className="movie-page__detail-value">{detail.value}</dd>
            </Fragment>
          ))}
        </dl>
      </section>
    </div>
  )
}
