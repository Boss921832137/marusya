import { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout/Layout'
import { HomePage } from './pages/HomePage/HomePage'
import { GenresPage } from './pages/GenresPage/GenresPage'
import { GenrePage } from './pages/GenrePage/GenrePage'
import { MoviePage } from './pages/MoviePage/MoviePage'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { AccountPage } from './pages/AccountPage/AccountPage'
import { getProfile } from './api/auth'
import { useAppDispatch } from './store/hooks'
import { setUser } from './store/authSlice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const profile = await getProfile()
        dispatch(setUser(profile))
      } catch {
        // пользователь не вошёл — ничего не делаем
      }
    }

    restoreSession()
  }, [dispatch])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/genres/:genreName" element={<GenrePage />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
