import { useEffect, useState } from 'react'
import { getRandomMovie } from '../api/movies'
import type { Movie } from '../types/movie'

export function useRandomMovie() {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null)

  const loadRandomMovie = async () => {
    const loadedMovie = await getRandomMovie().catch(() => null)

    if (loadedMovie) {
      setRandomMovie(loadedMovie)
    }
  }

  useEffect(() => {
    const loadFirstRandomMovie = async () => {
      setRandomMovie(await getRandomMovie().catch(() => null))
    }

    loadFirstRandomMovie()
  }, [])

  return { randomMovie, loadRandomMovie }
}
