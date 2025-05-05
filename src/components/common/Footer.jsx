import { useLocation } from 'react-router-dom'
import ROUTES from '../../store/constants/routes'
import { useTournamentsDetails } from '../../store/slices/useTournamentsDetails'

const Footer = () => {
  const { currentTournament } = useTournamentsDetails()
  const location = useLocation()
  const currentPath = location.pathname
  let backgroundStyle = 'bg-dark'

  const getColStyle = () => {
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

      let customStyle = 'col-lg-12'
      if (footerElementsWithData.length === 1) customStyle = 'col-lg-6'
      if (footerElementsWithData.length === 2) customStyle = 'col-lg-4'

      return customStyle
    }
  }

  const getBackground = () => {
    if (currentPath === ROUTES.CONTACT ||
        currentPath === ROUTES.ADMIN.CONTACT ||
        currentPath === ROUTES.ADMIN.EMAIL_SENDER
    ) backgroundStyle = 'bg-light'
    return `footer-section ${backgroundStyle}`
  }

  return (
    <footer className={getBackground()}>
      <div className="container">
        <div style={{ textAlign: 'center' }} className="row">
          <div className="col-lg-12">
            <div className="widget mb-3">
              <h3>Social</h3>
              <ul className="row list-unstyled links">
                <li className={getColStyle()}>
                  <a href={ROUTES.CONTACT}>
                    Contact
                  </a>
                </li>
                {currentTournament?.Contact?.footerContactWebPage && (
                  <li className={getColStyle()}>
                    <a href={currentTournament?.Contact?.footerContactWebPage}>
                      Web page
                    </a>
                  </li>
                )}
                {currentTournament?.Contact?.footerContactInstagram && (
                  <li className={getColStyle()}>
                    <a href={currentTournament?.Contact?.footerContactInstagram}>
                      Instagram
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-md-12">
            <div className=" pt-5">
              <p>
                &copy; {new Date().getFullYear()} All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer