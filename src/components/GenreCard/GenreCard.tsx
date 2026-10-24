import { Link } from 'react-router'
import './GenreCard.scss'

interface GenreCardProps {
  name: string
  title: string
}

export function GenreCard({ name, title }: GenreCardProps) {
  return (
    <Link className="genre-card" to={`/genres/${name}`}>
      {title}
    </Link>
  )
}
