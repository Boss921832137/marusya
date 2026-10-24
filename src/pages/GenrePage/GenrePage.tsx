import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { genreTitles } from '../../constants/genreTitles'
import { getMoviesByGenre, MOVIES_PER_PAGE } from '../../api/movies'
import type { Movie } from '../../types/movie'
import { sortMoviesByRating } from '../../utils/sortMoviesByRating'
import { MovieCard } from '../../components/MovieCard/MovieCard'
import './GenrePage.scss'

export function GenrePage() {
  const { genreName } = useParams()
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [hasMoreMovies, setHasMoreMovies] = useState(true)
  const listEndRef = useRef<HTMLDivElement>(null)

  const genreTitle = genreName ? (genreTitles[genreName] ?? genreName) : 'Жанр'

  useEffect(() => {
    if (!genreName) {
      return
    }

    let isCancelled = false

    const loadMovies = async () => {
      try {
        const loadedMovies = await getMoviesByGenre(genreName, page)

        if (isCancelled) {
          return
        }

        setMovies((previousMovies) => [...previousMovies, ...sortMoviesByRating(loadedMovies)])

        if (loadedMovies.length < MOVIES_PER_PAGE) {
          setHasMoreMovies(false)
        }
      } catch {
        setErrorMessage('Не удалось загрузить фильмы')
      } finally {
        setIsLoading(false)
      }
    }

    loadMovies()

    return () => {
      isCancelled = true
    }
  }, [genreName, page])

  useEffect(() => {
    const listEnd = listEndRef.current

    if (!listEnd || !hasMoreMovies || isLoading) {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsLoading(true)
        setPage((previousPage) => previousPage + 1)
      }
    })

    observer.observe(listEnd)

    return () => {
      observer.disconnect()
    }
  }, [hasMoreMovies, isLoading])

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
