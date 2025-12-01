import { useLocation, useNavigate } from 'react-router-dom'
import ROUTES from '../../store/constants/routes'
import { useTournamentsDetails } from '../../store/slices/useTournamentsDetails'

const Footer = () => {
  const { currentTournament } = useTournamentsDetails()
  const location = useLocation()
  const currentPath = location.pathname
  const backgroundStyle = 'bg-dark'
  const navigate = useNavigate()

  const getColStyle = () => {
    let customStyle = 'col-lg-12'
    const contact = currentTournament.Contact

    if (contact) {
      const footerElementsWithData = Object.entries(contact).filter(
        ([key, value]) => {
          const validElement = key.startsWith('footerContact') && value != null && value !== ''

          if (validElement) {
            return { [key]: value }
          } else {
            return null
          }
        }
      ).filter(element => element !== null)

      if (footerElementsWithData.length === 1) customStyle = 'col-lg-6'
      if (footerElementsWithData.length === 2) customStyle = 'col-lg-4'
    }
    return customStyle
  }

  return (
    <footer className="centered-row custom-footer">
      <div className="footer-logo">
        <img src="/src/images/FFH_Hero_Footer_Black_Title.png" alt="Logo Footer" />
      </div>
      <div className="centered footer-buttons">
        <button>SCHREIB UNS EINE EMAIL</button>
        <button onClick={() => navigate(ROUTES.CONTACT)}>KONTAKTFORMULAR</button>
      </div>
      <div className="centered social-media-container">
        <div className="centered-row social-icons-container">
          {/* Instagram */}
          <a href="https://www.instagram.com/futsalolympiquebasel_offiziell/" target="_blank" rel="noopener noreferrer">
            <img src="/src/images/Social_Icons/Icon_Instagram.svg" alt="Instagram" />
          </a>

          {/* Facebook */}
          <a href="https://www.facebook.com/profile.php?id=100087476346470" target="_blank" rel="noopener noreferrer">
            <img src="/src/images/Social_Icons/Icon_Facebook.svg" alt="Facebook" />
          </a>

          {/* Webseite */}
          <a href="https://www.futsalolympiquebasel.ch/" target="_blank" rel="noopener noreferrer">
            <img src="/src/images/Social_Icons/Icon_Webseite.svg" alt="Webseite" />
          </a>
        </div>
        <div>
          <p>Impressum</p>
          <p>Datenschutz</p>
        </div>
        <div>
          <p>© 2025 Alle Rechte vorbehalten</p>
          <p>Besuchen Sie unsere <a href="https://www.futsalolympiquebasel.ch/" target="_blank" rel="noopener noreferrer">
            Website Futsal Olympique Basel
          </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer