import { Link } from 'react-router'
import './MovieCard.scss'

interface MovieCardProps {
  id: number
  title: string
  posterUrl: string | null
  rating: number
  onRemove?: () => void
}

export function MovieCard({ id, title, posterUrl, rating, onRemove }: MovieCardProps) {
  return (
    <article className="movie-card">
      <Link to={`/movie/${id}`} className="movie-card__link">
        {posterUrl ? (
          <img className="movie-card__poster" src={posterUrl} alt={title} />
        ) : (
          <div className="movie-card__no-poster">Нет постера</div>
        )}
        <h3 className="movie-card__title">{title}</h3>
        <span className="movie-card__rating">{rating}</span>
      </Link>
      {onRemove && (
        <button
          className="movie-card__remove"
          type="button"
          onClick={onRemove}
          aria-label="Удалить из избранного"
        >
          ×
        </button>
      )}
    </article>
  )
}
