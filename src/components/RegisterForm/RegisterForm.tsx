import { useState, type ChangeEvent, type FormEvent } from 'react'
import { getProfile, login, register } from '../../api/auth'
import { useAppDispatch } from '../../store/hooks'
import { setUser } from '../../store/authSlice'
import '../LoginForm/LoginForm.scss'

interface RegisterFormValues {
  email: string
  name: string
  surname: string
  password: string
  passwordConfirmation: string
}

interface RegisterFormProps {
  onSuccess: () => void
}

const initialFormValues: RegisterFormValues = {
  email: '',
  name: '',
  surname: '',
  password: '',
  passwordConfirmation: '',
}

function getInputClassName(isInvalid: boolean): string {
  return isInvalid ? 'auth-form__input auth-form__input--error' : 'auth-form__input'
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [formValues, setFormValues] = useState<RegisterFormValues>(initialFormValues)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const dispatch = useAppDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((previousValues) => ({ ...previousValues, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true)

    const hasEmptyField = Object.values(formValues).some((value) => value.trim() === '')
    if (hasEmptyField) {
      return
    }

    if (formValues.password !== formValues.passwordConfirmation) {
      setErrorMessage('Пароли не совпадают')
      return
    }

    setErrorMessage(null)
    setIsSending(true)

    try {
      await register({
        email: formValues.email,
        password: formValues.password,
        name: formValues.name,
        surname: formValues.surname,
      })
      await login(formValues.email, formValues.password)
      const profile = await getProfile()
      dispatch(setUser(profile))
      onSuccess()
    } catch {
      setErrorMessage('Не удалось зарегистрироваться. Возможно, эта почта уже занята')
    } finally {
      setIsSending(false)
    }
  }

  const isFieldEmpty = (fieldName: keyof RegisterFormValues) =>
    isSubmitted && formValues[fieldName].trim() === ''

  const isPasswordMismatch = isSubmitted && formValues.password !== formValues.passwordConfirmation

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form__title">Регистрация</h2>
      <input
        className={getInputClassName(isFieldEmpty('email'))}
        type="email"
        name="email"
        placeholder="Электронная почта"
        value={formValues.email}
        onChange={handleChange}
      />
      <input
        className={getInputClassName(isFieldEmpty('name'))}
        name="name"
        placeholder="Имя"
        value={formValues.name}
        onChange={handleChange}
      />
      <input
        className={getInputClassName(isFieldEmpty('surname'))}
        name="surname"
        placeholder="Фамилия"
        value={formValues.surname}
        onChange={handleChange}
      />
      <input
        className={getInputClassName(isFieldEmpty('password'))}
        type="password"
        name="password"
        placeholder="Пароль"
        value={formValues.password}
        onChange={handleChange}
      />
      <input
        className={getInputClassName(isFieldEmpty('passwordConfirmation') || isPasswordMismatch)}
        type="password"
        name="passwordConfirmation"
        placeholder="Подтвердите пароль"
        value={formValues.passwordConfirmation}
        onChange={handleChange}
      />
      {errorMessage && <p className="auth-form__error">{errorMessage}</p>}
      <button className="auth-form__submit" type="submit" disabled={isSending}>
        {isSending ? 'Создаём...' : 'Создать аккаунт'}
      </button>
    </form>
  )
}
