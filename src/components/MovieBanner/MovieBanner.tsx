import { useState } from 'react'
import { Link } from 'react-router'
import type { Movie } from '../../types/movie'
import { formatRating, formatRuntime } from '../../utils/formatters'
import { Modal } from '../Modal/Modal'
import './MovieBanner.scss'

interface MovieBannerProps {
  movie: Movie
  hasDetailsLink?: boolean
  onRefresh?: () => void
}

export function MovieBanner({ movie, hasDetailsLink, onRefresh }: MovieBannerProps) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)

  const handleTrailerClick = () => {
    setIsTrailerOpen(true)
  }

  const handleTrailerClose = () => {
    setIsTrailerOpen(false)
  }

  return (
    <section className="movie-banner">
      {movie.backdropUrl && (
        <img className="movie-banner__backdrop" src={movie.backdropUrl} alt={movie.title} />
      )}
      <div className="movie-banner__info">
        <div className="movie-banner__meta">
          <span className="movie-banner__rating">{formatRating(movie.tmdbRating)}</span>
          <span>{movie.releaseYear}</span>
          <span>{movie.genres.join(', ')}</span>
          <span>{formatRuntime(movie.runtime)}</span>
        </div>
        <h1 className="movie-banner__title">{movie.title}</h1>
        <p className="movie-banner__plot">{movie.plot}</p>
        <div className="movie-banner__actions">
          {movie.trailerYouTubeId && (
            <button
              className="movie-banner__trailer-button"
              type="button"
              onClick={handleTrailerClick}
            >
              Трейлер
            </button>
          )}
          <button className="movie-banner__favorite-button" type="button">
            ♡
          </button>
          {hasDetailsLink && (
            <Link className="movie-banner__details-button" to={`/movie/${movie.id}`}>
              О фильме
            </Link>
          )}
          {onRefresh && (
            <button
              className="movie-banner__refresh-button"
              type="button"
              onClick={onRefresh}
              aria-label="Другой фильм"
            >
              ↻
            </button>
          )}
        </div>
      </div>
      {isTrailerOpen && movie.trailerYouTubeId && (
        <Modal variant="video" onClose={handleTrailerClose}>
          <iframe
            className="modal__video"
            src={`https://www.youtube.com/embed/${movie.trailerYouTubeId}?autoplay=1`}
            title={`Трейлер: ${movie.title}`}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        </Modal>
      )}
    </section>
  )
}
