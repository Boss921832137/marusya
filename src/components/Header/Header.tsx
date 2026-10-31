import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { SearchModal } from '../SearchModal/SearchModal'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { AuthModal } from '../AuthModal/AuthModal'
import { closeAuthModal, openAuthModal } from '../../store/authSlice'
import './Header.scss'

interface NavigationLink {
  title: string
  path: string
}

const navigationLinks: NavigationLink[] = [
  { title: 'Главная', path: '/' },
  { title: 'Жанры', path: '/genres' },
]

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const user = useAppSelector((state) => state.auth.user)

  const isAuthModalOpen = useAppSelector((state) => state.auth.isAuthModalOpen)
  const dispatch = useAppDispatch()

  const handleAuthModalClick = () => {
    dispatch(openAuthModal())
  }

  const handleAuthModalClose = () => {
    dispatch(closeAuthModal())
  }

  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
  }

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <Link to="/" className="header__logo">
            маруся
          </Link>
          <nav className="header__nav">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? 'header__link header__link--active' : 'header__link'
                }
              >
                {link.title}
              </NavLink>
            ))}
          </nav>
          <button className="header__search" onClick={handleSearchClick} type="button">
            Поиск
          </button>
          {user ? (
            <Link className="header__login" to="/account">
              {user.surname}
            </Link>
          ) : (
            <button className="header__login" onClick={handleAuthModalClick} type="button">
              Войти
            </button>
          )}
        </div>
      </header>
      {isAuthModalOpen && <AuthModal onClose={handleAuthModalClose} />}
      {isSearchOpen && <SearchModal onClose={handleSearchClose} />}
    </>
  )
}
