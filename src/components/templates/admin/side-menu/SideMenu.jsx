import { Button, Offcanvas } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import { useSideMenuStore } from '../../../../store/slices/useSideMenuStore'
import TournamentOptionsMain from './TournamentOptionsMain'
import TournamentList from '../tournament-list/TournamentList'
import ROUTES from '../../../../store/constants/routes'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

const SideMenu = () => {
  const { setShowTournamentLists, showTournamentList } = useSideMenuStore()
  const [showSideMenu, setShowSideMenu] = useState()
  const handleClose = () => setShowSideMenu(false)
  const handleShow = () => setShowSideMenu(!showSideMenu)
  const navigate = useNavigate()

  const location = useLocation()

  const handleBackToAdmin = () => {
    if (location.pathname === ROUTES.ADMIN.MAIN) {
      handleClose(true)
      return
    }
    navigate(ROUTES.ADMIN.MAIN)
  }

  return (
    <>
      <Button
        variant="light"
        onClick={handleShow}
        className={`side-menu-btn ${showSideMenu ? 'hide-btn' : ''}`}
      >
        <FaBars size={24} />
      </Button>

      <Offcanvas
        show={showSideMenu}
        onHide={handleClose}
        placement="start"
        backdrop
        className="offcanvas-start"
      >
        <Offcanvas.Header>
          <Button
            variant="outline-success"
            onClick={() => handleBackToAdmin(ROUTES.ADMIN.MAIN)}
          >
            Back to admin
          </Button>
          <button className="custom-close-btn" onClick={handleClose}>
            &times;
          </button>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <div className="tournament-options bg-lights">
            <h4>
              <Button variant="light" onClick={() => setShowTournamentLists(!showTournamentList)}>
                {showTournamentList ? 'Hide tournaments' : 'Show tournaments'}
              </Button>
            </h4>

            {showTournamentList && (
              <TournamentList />

            )}
          </div>
          <TournamentOptionsMain />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default SideMenu