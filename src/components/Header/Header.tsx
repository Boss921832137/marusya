import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { SearchModal } from '../SearchModal/SearchModal'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { AuthModal } from '../AuthModal/AuthModal'
import { closeAuthModal, openAuthModal } from '../../store/authSlice'
import { Logo } from '../Logo/Logo'
import { GenresIcon } from '../icons/GenresIcon'
import { SearchIcon } from '../icons/SearchIcon'
import { UserIcon } from '../icons/UserIcon'
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
          <Link to="/" className="header__logo" aria-label="На главную">
            <Logo />
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
          <Link className="header__genres" to="/genres" aria-label="Жанры">
            <GenresIcon />
          </Link>
          <button
            className="header__search"
            onClick={handleSearchClick}
            type="button"
            aria-label="Поиск"
          >
            <SearchIcon />
            <span className="header__search-text">Поиск</span>
          </button>
          {user ? (
            <Link className="header__login" to="/account" aria-label="Мой аккаунт">
              <span className="header__login-icon">
                <UserIcon />
              </span>
              <span className="header__login-text">{user.surname}</span>
            </Link>
          ) : (
            <button
              className="header__login"
              onClick={handleAuthModalClick}
              type="button"
              aria-label="Войти"
            >
              <span className="header__login-icon">
                <UserIcon />
              </span>
              <span className="header__login-text">Войти</span>
            </button>
          )}
        </div>
      </header>
      {isAuthModalOpen && <AuthModal onClose={handleAuthModalClose} />}
      {isSearchOpen && <SearchModal onClose={handleSearchClose} />}
    </>
  )
}
