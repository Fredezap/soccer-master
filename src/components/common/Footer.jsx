import { useLocation, useNavigate } from 'react-router-dom'
import ROUTES from '../../store/constants/routes'
import { useTournamentsDetails } from '../../store/slices/useTournamentsDetails'
import websiteIcon from '@/images/Social_Icons/Icon_Webseite_olympique.png'
import instagramIcon from '@/images/Social_Icons/Icon_Instagram.svg'
import facebookIcon from '@/images/Social_Icons/Icon_Facebook.svg'
import fvnwsIcon from '@/images/Social_Icons/fvnws.png'
import footerImg from '@/images/FFH_Hero_Footer_Black_Title.png'

const Footer = () => {
  const { currentTournament } = useTournamentsDetails()
  const location = useLocation()
  const navigate = useNavigate()
  let emails = 'futsalforher@gmail.com'
  const emailsExist = currentTournament?.Emails && currentTournament.Emails.length > 0
  if (emailsExist) emails = currentTournament.Emails.map(email => email.email).join(',')

  return (
    <footer className="centered-row custom-footer">
      <div className="footer-logo">
        <img src={footerImg} alt="Logo Footer" />
      </div>
      <div className="centered footer-buttons">
        <a href={`mailto:${emails}`}>
          <button>SCHREIB UNS EINE EMAIL</button>
        </a>
        <button onClick={() => navigate(ROUTES.CONTACT)}>KONTAKTFORMULAR</button>
      </div>
      <div className="centered social-media-container">
        <div className="centered-row social-icons-container">
          {/* Instagram */}
          <a href="https://www.instagram.com/futsalolympiquebasel_offiziell/" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          {/* Facebook */}
          <a href="https://www.facebook.com/profile.php?id=100087476346470" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          {/* Webseite */}
          <a href="https://www.futsalolympiquebasel.ch/" target="_blank" rel="noopener noreferrer">
            <img src={websiteIcon} alt="Webseite" />
          </a>
          <a href="https://matchcenter.fvnws.ch/default.aspx?v=876752&oid=8&lng=1" target="_blank" rel="noopener noreferrer">
            <img src={fvnwsIcon} alt="Webseite" />
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