import { useState, type FormEvent } from 'react'
import { getProfile, login } from '../../api/auth'
import { useAppDispatch } from '../../store/hooks'
import { setUser } from '../../store/authSlice'
import './LoginForm.scss'

interface LoginFormProps {
  onSuccess: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const dispatch = useAppDispatch()

  const isEmailInvalid = isSubmitted && email.trim() === ''
  const isPasswordInvalid = isSubmitted && password.trim() === ''

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true)

    if (email.trim() === '' || password.trim() === '') {
      return
    }

    setErrorMessage(null)
    setIsSending(true)

    try {
      await login(email, password)
      const profile = await getProfile()
      dispatch(setUser(profile))
      onSuccess()
    } catch {
      setErrorMessage('Неверная почта или пароль')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form__title">Вход</h2>
      <input
        className={isEmailInvalid ? 'auth-form__input auth-form__input--error' : 'auth-form__input'}
        type="email"
        placeholder="Электронная почта"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        className={
          isPasswordInvalid ? 'auth-form__input auth-form__input--error' : 'auth-form__input'
        }
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {errorMessage && <p className="auth-form__error">{errorMessage}</p>}
      <button className="auth-form__submit" type="submit" disabled={isSending}>
        {isSending ? 'Входим...' : 'Войти'}
      </button>
    </form>
  )
}
