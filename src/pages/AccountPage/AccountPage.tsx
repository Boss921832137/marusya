import { useNavigate } from 'react-router'
import { logout } from '../../api/auth'
import { clearUser } from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import './AccountPage.scss'

export function AccountPage() {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogoutClick = async () => {
    await logout()
    dispatch(clearUser())
    navigate('/')
  }

  if (!user) {
    return <p className="container status-message">Войдите, чтобы открыть аккаунт</p>
  }

  return (
    <div className="container account-page">
      <h1 className="account-page__title">Мой аккаунт</h1>
      <div className="account-page__info">
        <div className="account-page__row">
          <span className="account-page__avatar">
            {user.name[0]}
            {user.surname[0]}
          </span>
          <div>
            <p className="account-page__label">Имя Фамилия</p>
            <p className="account-page__value">
              {user.name} {user.surname}
            </p>
          </div>
        </div>
        <div className="account-page__row">
          <span className="account-page__avatar">✉</span>
          <div>
            <p className="account-page__label">Электронная почта</p>
            <p className="account-page__value">{user.email}</p>
          </div>
        </div>
      </div>
      <button className="account-page__logout" type="button" onClick={handleLogoutClick}>
        Выйти из аккаунта
      </button>
    </div>
  )
}
