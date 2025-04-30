import { useState, useEffect } from 'react'
import ROUTES from '../../store/constants/routes.js'
import useCurrentRouteStore from '../../store/slices/useCurrentRouteStore.js'
import Logo from '../../images/logo.png'

const Header = () => {
  const { current } = useCurrentRouteStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const getClass = (route) => (current === route ? 'active' : '')

  const adminUser = globalThis.localStorage.getItem('user')

  const toggleMenu = () => setMenuOpen(prev => !prev)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 850)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className={`site-navbar ${menuOpen ? 'open' : ''} py-4`} role="banner">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo como botón en móvil */}
          {isMobile
            ? (
              <div className="menu-toggle-logo" onClick={toggleMenu}>
                <img src={Logo} alt="Logo" className="menu-toggle-button" />
              </div>
            )
            : (
              <div className="site-logo">
                <a href={ROUTES.MAIN}>
                  <img src={Logo} alt="Logo" />
                </a>
              </div>
            )}

          {/* Menú de navegación */}
          <nav className={`site-navigation ${menuOpen ? 'open' : ''}`} role="navigation">
            <ul className="site-menu main-menu js-clone-nav">
              {isMobile && (
                <li><a href={ROUTES.MAIN} className="nav-link">Main</a></li>
              )}
              <li className={getClass(ROUTES.HOME)}><a href={ROUTES.HOME} className="nav-link">Home</a></li>
              <li className={getClass(ROUTES.MATCHES)}><a href={ROUTES.MATCHES} className="nav-link">Matches</a></li>
              <li className={getClass(ROUTES.TEAMS)}><a href={ROUTES.TEAMS} className="nav-link">Teams</a></li>
              <li className={getClass(ROUTES.CONTACT)}><a href={ROUTES.CONTACT} className="nav-link">Contact</a></li>
              {adminUser && (
                <li className={getClass(ROUTES.ADMIN.MAIN)}>
                  <a href={ROUTES.ADMIN.MAIN} className="nav-link">Admin</a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header