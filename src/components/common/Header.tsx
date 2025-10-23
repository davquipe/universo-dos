type SocialLink = {
  href: string;
  label: string;
}

const socials: SocialLink[] = [
  { href: '#', label: 'Facebook' },
  { href: '#', label: 'Twitter' },
  { href: '#', label: 'Instagram' },
]

const Header = () => {
  return (
    <header className="app-header">
      <div className="app-header__topbar">
        <div className="container">
          <ul className="social" aria-label="Redes sociales">
            <li>
              <a href={socials[0].href} aria-label={socials[0].label}>
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                  <path d="M22 12.07C22 6.49 17.52 2 11.94 2S2 6.49 2 12.07c0 5 3.66 9.14 8.44 9.93v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.1.18 2.1.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46v1.75h2.59l-.41 2.9h-2.18V22c4.78-.79 8.44-4.93 8.44-9.93z" fill="currentColor"/>
                </svg>
              </a>
            </li>
            <li>
              <a href={socials[1].href} aria-label={socials[1].label}>
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.23 4.23 0 0 0 1.86-2.33 8.44 8.44 0 0 1-2.68 1.03 4.21 4.21 0 0 0-7.41 2.87c0 .33.04.66.11.97A11.95 11.95 0 0 1 3.14 4.7a4.2 4.2 0 0 0 1.3 5.62 4.18 4.18 0 0 1-1.9-.52v.05a4.22 4.22 0 0 0 3.38 4.13c-.46.13-.94.2-1.43.07a4.22 4.22 0 0 0 3.94 2.93A8.45 8.45 0 0 1 2 19.54a11.94 11.94 0 0 0 6.46 1.89c7.75 0 12-6.42 12-11.98 0-.18 0-.36-.01-.54A8.5 8.5 0 0 0 22.46 6z" fill="currentColor"/>
                </svg>
              </a>
            </li>
            <li>
              <a href={socials[2].href} aria-label={socials[2].label}>
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 16.8 2.8 2.8 0 0 0 12 9.2zm5.35-1.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor"/>
                </svg>
              </a>
            </li> 
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
