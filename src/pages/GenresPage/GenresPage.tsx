import { useEffect, useState } from 'react'
import { getGenres } from '../../api/movies'
import { GenreCard } from '../../components/GenreCard/GenreCard'
import type { Genre } from '../../types/genre'
import { createGenres } from '../../utils/createGenres'
import './GenresPage.scss'

export function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreNames = await getGenres()
        setGenres(createGenres(genreNames))
      } catch {
        setErrorMessage('Не удалось загрузить жанры')
      } finally {
        setIsLoading(false)
      }
    }

    loadGenres()
  }, [])

  return (
    <div className="container genres-page">
      <h1 className="genres-page__title">Жанры фильмов</h1>
      {isLoading && <p className="status-message">Загрузка...</p>}
      {errorMessage && <p className="status-message status-message--error">{errorMessage}</p>}
      <div className="genres-page__list">
        {genres.map((genre) => (
          <GenreCard key={genre.name} name={genre.name} title={genre.title} />
        ))}
      </div>
    </div>
  )
}
