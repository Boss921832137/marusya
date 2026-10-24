import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getMovieById } from '../../api/movies'
import type { Movie } from '../../types/movie'
import { MovieBanner } from '../../components/MovieBanner/MovieBanner'
import './MoviePage.scss'

export function MoviePage() {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { movieId } = useParams()

  useEffect(() => {
    if (!movieId) {
      return
    }

    const loadMovie = async () => {
      try {
        const loadedMovie = await getMovieById(movieId)
        setMovie(loadedMovie)
      } catch {
        setErrorMessage('Не удалось загрузить фильм')
      } finally {
        setIsLoading(false)
      }
    }

    loadMovie()
  }, [movieId])

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
