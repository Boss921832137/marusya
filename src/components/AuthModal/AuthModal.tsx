import { useState } from 'react'
import { LoginForm } from '../LoginForm/LoginForm'
import { Modal } from '../Modal/Modal'
import { RegisterForm } from '../RegisterForm/RegisterForm'

type AuthMode = 'login' | 'register'

interface AuthModalProps {
  onClose: () => void
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login')

  return (
    <Modal onClose={onClose}>
      {mode === 'login' ? <LoginForm onSuccess={onClose} /> : <RegisterForm onSuccess={onClose} />}

      {mode === 'login' ? (
        <button className="auth-form__switch" type="button" onClick={() => setMode('register')}>
          Регистрация
        </button>
      ) : (
        <button className="auth-form__switch" type="button" onClick={() => setMode('login')}>
          У меня есть пароль
        </button>
      )}
    </Modal>
  )
}
