import './Logo.scss'

export function Logo() {
  return (
    <span className="logo">
      <svg className="logo__icon" viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2787f5" />
            <stop offset="100%" stopColor="#a393f5" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="14" fill="url(#logo-gradient)" />
      </svg>
      <span className="logo__text">маруся</span>
    </span>
  )
}
