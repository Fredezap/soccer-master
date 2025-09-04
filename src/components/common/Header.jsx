import { useState, useEffect } from 'react'
import ROUTES from '../../store/constants/routes.js'
import useCurrentRouteStore from '../../store/slices/useCurrentRouteStore.js'
import Logo from '../../images/logo.png'
import olimpicBaselLogo from '../../images/olimpic-basel.png'
import { useTournamentsDetails } from '../../store/slices/useTournamentsDetails.js'
import { useUserStore } from '../../store/slices/useUserStore.js'
import { FaVideo } from 'react-icons/fa'

const Header = () => {
  const { current } = useCurrentRouteStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { currentTournament } = useTournamentsDetails()
  const { isAdmin, isSuperAdmin } = useUserStore()

  const getClass = (route) => (current === route ? 'active' : '')

  const toggleMenu = () => setMenuOpen(prev => !prev)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 850)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const liveStreming = 'https://www.youtube.com/watch?v=TFCoKDU9wNk'

  return (
    <header className={`site-navbar ${menuOpen ? 'open' : ''} py-4`} role="banner">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo como botón en móvil */}
          {isMobile
            ? (
              <div className="menu-toggle-logo" onClick={toggleMenu}>
                <img src={olimpicBaselLogo} alt="Logo" className="menu-toggle-button" />
              </div>
            )
            : (
              <div className="site-logo">
                <a href={ROUTES.MAIN}>
                  <img src={olimpicBaselLogo} alt="Logo" />
                </a>
              </div>
            )}

          {/* Menú de navegación */}
          <nav className={`site-navigation ${menuOpen ? 'open' : ''}`} role="navigation">
            <ul className="site-menu main-menu js-clone-nav">
              {isMobile && (
                <li><a href={ROUTES.MAIN} className="nav-link">Main</a></li>
              )}
              {(currentTournament && Object.entries(currentTournament).length !== 0) && (
                <>
                  <li className={getClass(ROUTES.HOME)}><a href={ROUTES.HOME} className="nav-link">Home</a></li>
                  <li className={getClass(ROUTES.MATCHES)}><a href={ROUTES.MATCHES} className="nav-link">Matches</a></li>
                  <li className={getClass(ROUTES.TEAMS)}><a href={ROUTES.TEAMS} className="nav-link">Teams</a></li>
                  <li className={getClass(ROUTES.RULES)}><a href={ROUTES.RULES} className="nav-link">Rules</a></li>
                  <li className={getClass(ROUTES.CONTACT)}><a href={ROUTES.CONTACT} className="nav-link">Contact</a></li>
                  <li>
                    <a href={liveStreming} className="nav-link" target="_blank" rel="noopener noreferrer">
                      <div className="centered-row">
                        <FaVideo className="icon-pulse" size={22} />
                        <span>Live streaming</span>
                      </div>
                    </a>
                  </li>
                </>
              )}
              {/* {isAdmin() || isSuperAdmin()
                ? (
                  <li className={getClass(ROUTES.ADMIN.MAIN)}>
                    <a href={ROUTES.ADMIN.MAIN} className="nav-link">Admin</a>
                  </li>
                )
                : (
                  <li className={getClass(ROUTES.LOGIN)}>
                    <a href={ROUTES.LOGIN} className="nav-link">Login</a>
                  </li>
                )} */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header