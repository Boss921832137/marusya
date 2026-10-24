export function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="footer">
      <p className="footer__copyright">© {currentYear} ВК Маруся</p>
    </footer>
  )
}
