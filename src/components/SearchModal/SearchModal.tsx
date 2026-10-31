import { useState } from 'react'
import { Link } from 'react-router'
import { Modal } from '../Modal/Modal'
import { useMovieSearch } from '../../hooks/useMovieSearch'
import './SearchModal.scss'

interface SearchModalProps {
  onClose: () => void
}

export function SearchModal({ onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const { foundMovies, isSearching } = useMovieSearch(searchQuery)

  const hasQuery = searchQuery.trim() !== ''

  return (
    <Modal onClose={onClose}>
      <input
        className="search-modal__input"
        type="search"
        placeholder="Название фильма"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        autoFocus
      />
      {hasQuery && isSearching && <p className="search-modal__status">Ищем...</p>}

      {hasQuery && !isSearching && foundMovies.length === 0 && (
        <p className="search-modal__status">Ничего не найдено</p>
      )}

      {hasQuery && !isSearching && foundMovies.length > 0 && (
        <ul className="search-modal__results">
          {foundMovies.map((movie) => (
            <li key={movie.id}>
              <Link className="search-modal__result" to={`/movie/${movie.id}`} onClick={onClose}>
                {movie.posterUrl && (
                  <img className="search-modal__poster" src={movie.posterUrl} alt={movie.title} />
                )}
                <div>
                  <p className="search-modal__title">{movie.title}</p>
                  <p className="search-modal__meta">{movie.releaseYear}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  )
}
