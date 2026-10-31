interface HeartIconProps {
  isFilled: boolean
}

export function HeartIcon({ isFilled }: HeartIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={isFilled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20.5s-7.5-4.6-9.4-9.3C1.3 7.9 3.5 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.5 0 5.7 3.4 4.4 6.7-1.9 4.7-9.4 9.3-9.4 9.3z" />
    </svg>
  )
}
