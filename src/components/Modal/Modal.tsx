import type { ReactNode } from 'react'
import './Modal.scss'

interface ModalProps {
  children: ReactNode
  onClose: () => void
  variant?: 'default' | 'video'
}

export function Modal({ children, onClose, variant = 'default' }: ModalProps) {
  const contentClassName =
    variant === 'video' ? 'modal__content modal__content--video' : 'modal__content'

  return (
    <div className="modal">
      <div className={contentClassName}>
        <button className="modal__close" onClick={onClose} aria-label="Закрыть" type="button">
          ×
        </button>
        {children}
      </div>
    </div>
  )
}
