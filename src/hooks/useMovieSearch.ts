import { useEffect, useState } from 'react'
import { searchMovies } from '../api/movies'
import type { Movie } from '../types/movie'

const SEARCH_DELAY_MS = 500

export function useMovieSearch(searchQuery: string) {
  const [foundMovies, setFoundMovies] = useState<Movie[]>([])
  const [searchedQuery, setSearchedQuery] = useState('')

  useEffect(() => {
    const trimmedQuery = searchQuery.trim()

    if (!trimmedQuery) {
      return
    }

    let isCancelled = false

    const timeoutId = setTimeout(async () => {
      const movies = await searchMovies(trimmedQuery).catch(() => [])

      if (!isCancelled) {
        setFoundMovies(movies)
        setSearchedQuery(trimmedQuery)
      }
    }, SEARCH_DELAY_MS)

    return () => {
      isCancelled = true
      clearTimeout(timeoutId)
    }
  }, [searchQuery])

  const isSearching = searchQuery.trim() !== searchedQuery

  return { foundMovies, isSearching }
}
