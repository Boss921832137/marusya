import { useState, useEffect, type ChangeEvent } from 'react'
import { Link } from 'react-router'
import { searchMovies } from '../../api/movies'
import type { Movie } from '../../types/movie'
import { Modal } from '../Modal/Modal'
import './SearchModal.scss'

const SEARCH_DELAY_MS = 500

interface SearchModalProps {
  onClose: () => void
}

export function SearchModal({ onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [foundMovies, setFoundMovies] = useState<Movie[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setIsSearching(true)
  }

  useEffect(() => {
    const trimmedQuery = searchQuery.trim()

    if (!trimmedQuery) {
      return
    }

    let isCancelled = false

    const timeoutId = setTimeout(async () => {
      try {
        const movies = await searchMovies(trimmedQuery)

        if (!isCancelled) {
          setFoundMovies(movies)
        }
      } catch {
        if (!isCancelled) {
          setFoundMovies([])
        }
      } finally {
        if (!isCancelled) {
          setIsSearching(false)
        }
      }
    }, SEARCH_DELAY_MS)

    return () => {
      isCancelled = true
      clearTimeout(timeoutId)
    }
  }, [searchQuery])

  const hasQuery = searchQuery.trim() !== ''

  return (
    <Modal onClose={onClose}>
      <input
        className="search-modal__input"
        type="search"
        placeholder="Название фильма"
        value={searchQuery}
        onChange={handleSearchChange}
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
