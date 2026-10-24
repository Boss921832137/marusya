import { Link } from 'react-router'
import './MovieCard.scss'

interface MovieCardProps {
  id: number
  title: string
  posterUrl: string | null
  rating: number
}

export function MovieCard({ id, title, posterUrl, rating }: MovieCardProps) {
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
    </article>
  )
}
