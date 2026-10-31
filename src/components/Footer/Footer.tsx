import './Footer.scss'

interface SocialLink {
  title: string
  url: string
}

const socialLinks: SocialLink[] = [
  { title: 'VK', url: 'https://vk.com' },
  { title: 'YouTube', url: 'https://youtube.com' },
  { title: 'OK', url: 'https://ok.ru' },
  { title: 'Telegram', url: 'https://t.me' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <ul className="footer__socials">
          {socialLinks.map((link) => (
            <li key={link.title}>
              <a className="footer__social" href={link.url} target="_blank" rel="noreferrer">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="footer__copyright">© {currentYear} ВК Маруся</p>
      </div>
    </footer>
  )
}
