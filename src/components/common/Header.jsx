import { useState, useEffect, useRef } from 'react'
import ROUTES from '../../store/constants/routes.js'
import useCurrentRouteStore from '../../store/slices/useCurrentRouteStore.js'
import { useTournamentsDetails } from '../../store/slices/useTournamentsDetails.js'
import { useUserStore } from '../../store/slices/useUserStore.js'
import { FaVideo } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useMessageStore } from '../../store/slices/useMessageStore.js'
import getTournaments from './getters/GetTournaments.jsx'

const Header = () => {
  const { current } = useCurrentRouteStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showTournaments, setShowTournaments] = useState(false)

  const { currentTournament, tournaments } = useTournamentsDetails()
  const { isAdmin, isSuperAdmin } = useUserStore()
  const navigate = useNavigate()
  const { addMessage } = useMessageStore()
  const { fetchTournamentDetails } = getTournaments()
  const liveStreming = null

  const getClass = (route) => (current === route ? 'active' : '')
  const toggleMenu = () => setMenuOpen(prev => !prev)

  const handleSelectTournament = async(paramTournament) => {
    const response = await fetchTournamentDetails({ paramTournament })
    if (response?.success) navigate(ROUTES.HOME)
    else {
      addMessage({ type: 'error', content: 'An error ocurred finding the tournament that you have selected' })
      navigate(ROUTES.MAIN)
    }
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 850)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuRef = useRef(null)
  // Detectar click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      // si el menú está abierto y clickeás fuera → cerrar
      if (showTournaments && menuRef.current && !menuRef.current.contains(event.target)) {
        setShowTournaments(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showTournaments])

  return (
    <header className={`site-navbar ${menuOpen ? 'open' : ''} py-4`} role="banner">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between">

          {/* Logo */}
          <div
            className={`${isMobile ? 'menu-toggle-logo' : 'site-logo'} ${menuOpen ? 'open' : ''}`}
            onClick={isMobile ? toggleMenu : undefined}
          >
            {isMobile
              ? (
                <a className="menu-toggle-button" style={{ fontFamily: 'Fjalla One, sans-serif' }}>OLYMPIQUE BASEL</a>
              )
              : (
                <a href={ROUTES.MAIN} className="menu-toggle-button" style={{ fontFamily: 'Fjalla One, sans-serif' }}>OLYMPIQUE BASEL</a>
              )}
          </div>

          {/* Menú */}
          <nav className={`site-navigation ${menuOpen ? 'open' : ''} mt-md-0`} role="navigation">
            <ul className="site-menu main-menu js-clone-nav">
              {isMobile && <li><a href={ROUTES.MAIN} className="nav-link">Main</a></li>}

              {currentTournament && Object.entries(currentTournament).length !== 0 && (
                <>
                  {/* Startseite */}
                  <li
                    ref={menuRef}
                    className={getClass(ROUTES.HOME)}
                    onClick={() => setShowTournaments(prev => !prev)}
                    style={{ cursor: 'pointer', position: isMobile ? 'relative' : 'static', width: '100%' }}
                  >
                    <a className="nav-link">Startseite</a>

                    {/* Submenú */}
                    {showTournaments && (
                      <ul
                        style={{
                          position: isMobile ? 'relative' : 'absolute',
                          top: isMobile ? 'auto' : '80%',
                          left: 'auto',
                          width: isMobile ? '100%' : 'max-content',
                          margin: 0,
                          padding: '0.5rem',
                          listStyle: 'none',
                          backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255,255,255,0.3)',
                          backdropFilter: isMobile ? 'none' : 'blur(8px)',
                          zIndex: isMobile ? 'auto' : 9999,
                          borderRadius: isMobile ? '0' : '6px',
                          boxShadow: isMobile ? 'none' : '0 2px 8px rgba(0,0,0,0.15)'
                        }}
                      >
                        {tournaments.map(tournament => (
                          <li
                            key={tournament.id}
                            onClick={() => {
                              handleSelectTournament(tournament)
                              setShowTournaments(false)
                            }}
                            style={{
                              padding: '0.3rem 0',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <a>{tournament.name}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>

                  <li className={getClass(ROUTES.MATCHES)}><a href={ROUTES.MATCHES} className="nav-link">Spiele</a></li>
                  <li className={getClass(ROUTES.TEAMS)}><a href={ROUTES.TEAMS} className="nav-link">Teams</a></li>
                  <li className={getClass(ROUTES.INFO)}><a href={ROUTES.INFO} className="nav-link">Infos</a></li>
                  <li className={getClass(ROUTES.CONTACT)}><a href={ROUTES.CONTACT} className="nav-link">Kontakt</a></li>

                  {liveStreming && (
                    <li>
                      <a href={liveStreming} className="nav-link" target="_blank" rel="noopener noreferrer">
                        <div className="centered-row">
                          <FaVideo className="icon-pulse" size={22} />
                          <span>Live-Streaming</span>
                        </div>
                      </a>
                    </li>
                  )}
                </>
              )}

              {(isAdmin() || isSuperAdmin()) && (
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