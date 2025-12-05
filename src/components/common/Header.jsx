import { useState, useEffect, useRef } from 'react'
import ROUTES from '../../store/constants/routes.js'
import useCurrentRouteStore from '../../store/slices/useCurrentRouteStore.js'
import { useTournamentsDetails } from '../../store/slices/useTournamentsDetails.js'
import { useUserStore } from '../../store/slices/useUserStore.js'
import { FaVideo, FaChevronDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useMessageStore } from '../../store/slices/useMessageStore.js'
import getTournaments from './getters/GetTournaments.jsx'

const Header = () => {
  const { current } = useCurrentRouteStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showTeamsSubmenu, setShowTeamsSubmenu] = useState(false)
  const [showMatchesSubmenu, setShowMatchesSubmenu] = useState(false)
  const [showInfoSubmenu, setShowInfoSubmenu] = useState(false)

  const { currentTournament, tournaments } = useTournamentsDetails()
  const { isAdmin, isSuperAdmin } = useUserStore()
  const navigate = useNavigate()
  const { addMessage } = useMessageStore()
  const { fetchTournamentDetails } = getTournaments()
  const liveStreming = null

  const getClass = (route) => current === route ? 'active' : ''
  const toggleMenu = () => setMenuOpen(prev => !prev)

  const handleSelectTournament = async(paramTournament, route) => {
    const response = await fetchTournamentDetails({ paramTournament })
    if (response?.success) navigate(route)
    else {
      addMessage({ type: 'error', content: 'An error ocurred finding the tournament that you have selected' })
      navigate(ROUTES.HOME)
    }
  }

  // Toggle submenus y cerrar los demás
  const toggleSubmenu = (type) => {
    setShowTeamsSubmenu(type === 'teams' ? !showTeamsSubmenu : false)
    setShowMatchesSubmenu(type === 'matches' ? !showMatchesSubmenu : false)
    setShowInfoSubmenu(type === 'info' ? !showInfoSubmenu : false)
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 850)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowTeamsSubmenu(false)
        setShowMatchesSubmenu(false)
        setShowInfoSubmenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
                <a className="menu-toggle-button" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                  <h4 className="for-her">FUTSAL FOR HER</h4>
                </a>
              )
              : (
                <a href={ROUTES.HOME} className="menu-toggle-button" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                  <h4 className="for-her">FUTSAL FOR HER</h4>
                </a>
              )}
          </div>

          {/* Menú */}
          <nav className={`site-navigation ${menuOpen ? 'open' : ''} mt-md-0`} role="navigation">
            <ul className="site-menu main-menu js-clone-nav" ref={menuRef}>
              <>
                <li className={getClass(ROUTES.HOME)} onClick={() => navigate(ROUTES.HOME)} style={{ cursor: 'pointer', width: '100%' }}>
                  <a className="nav-link">STARTSEITE</a>
                </li>

                {/* SPIELE */}
                <li className={getClass(ROUTES.MATCHES)} style={{ position: 'relative', cursor: 'pointer' }}>
                  <div onClick={() => toggleSubmenu('matches')} className="nav-link d-flex align-items-center">
                      SPIELE <FaChevronDown style={{ marginLeft: '5px' }} />
                  </div>
                  {showMatchesSubmenu && (
                    <ul className="submenu" style={isMobile ? submenuMobileStyle : submenuStyle}>
                      {tournaments.map(t => (
                        <li key={t.tournamentId} onClick={() => handleSelectTournament(t, ROUTES.MATCHES)} style={submenuItemStyle}>
                          <a className="nav-link">{t.name}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* TEAMS */}
                <li className={getClass(ROUTES.TEAMS)} style={{ position: 'relative', cursor: 'pointer' }}>
                  <div onClick={() => toggleSubmenu('teams')} className="nav-link d-flex align-items-center">
                      TEAMS <FaChevronDown style={{ marginLeft: '5px' }} />
                  </div>
                  {showTeamsSubmenu && (
                    <ul className="submenu" style={isMobile ? submenuMobileStyle : submenuStyle}>
                      {tournaments.map(t => (
                        <li key={t.tournamentId} onClick={() => handleSelectTournament(t, ROUTES.TEAMS)} style={submenuItemStyle}>
                          <a className="nav-link">{t.name}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* INFOS */}
                <li className={getClass(ROUTES.INFO)} style={{ position: 'relative', cursor: 'pointer' }}>
                  <div onClick={() => toggleSubmenu('info')} className="nav-link d-flex align-items-center">
                      Infos <FaChevronDown style={{ marginLeft: '5px' }} />
                  </div>
                  {showInfoSubmenu && (
                    <ul className="submenu" style={isMobile ? submenuMobileStyle : submenuStyle}>
                      <li onClick={() => navigate(ROUTES.INTERVIEW)} className={getClass(ROUTES.INTERVIEW)} style={submenuItemStyle}>
                        <a className="nav-link">INTERVIEW</a>
                      </li>
                      <li onClick={() => navigate(ROUTES.INFO)} className={getClass(ROUTES.INFO)} style={submenuItemStyle}>
                        <a className="nav-link">REGLAMENT</a>
                      </li>
                    </ul>
                  )}
                </li>

                <li style={{ cursor: 'pointer', width: '100%' }} onClick={() => navigate(ROUTES.CONTACT)} className={getClass(ROUTES.CONTACT)}>
                  <a className="nav-link">KONTAKT</a>
                </li>

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

              {(isAdmin() || isSuperAdmin()) && (
                <li style={{ cursor: 'pointer', width: '100%' }} className={getClass(ROUTES.ADMIN.MAIN)}>
                  <a onClick={() => navigate(ROUTES.ADMIN.MAIN)} className="nav-link">Admin</a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

// Estilos del submenu desktop
// Estilos del submenu desktop con blur
const submenuStyle = {
  position: 'absolute',
  top: '120%',
  left: 0,
  minWidth: '150px',
  width: 'auto',
  listStyle: 'none',
  padding: '0.5rem 0',
  margin: 0,
  borderRadius: '6px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  zIndex: 9999
}

// Estilos del submenu mobile con blur
const submenuMobileStyle = {
  display: 'block',
  position: 'relative',
  width: '100%',
  listStyle: 'none',
  padding: '0',
  margin: '0',
  borderRadius: '0',
  boxShadow: 'none'
}

const submenuItemStyle = {
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
}

export default Header