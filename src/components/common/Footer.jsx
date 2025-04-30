import { useLocation } from 'react-router-dom'
import ROUTES from '../../store/constants/routes'

const Footer = () => {
  const location = useLocation()
  const currentPath = location.pathname
  let backgroundStyle = 'bg-dark'

  const getBackground = () => {
    if (currentPath === ROUTES.CONTACT || currentPath === ROUTES.ADMIN.EMAIL_SENDER) backgroundStyle = 'bg-light'
    return `footer-section ${backgroundStyle}`
  }

  // todo: falta ver lo de los puntos de los equipos. Si agregamos la diferencia de goles
  // todo: ver estos links de contacto, porque deberian poder ser agregados desde admin tambien

  return (
    <footer className={getBackground()}>
      <div className="container">
        <div style={{ textAlign: 'center' }} className="row">
          <div className="col-lg-12">
            <div className="widget mb-3">
              <h3>Social</h3>
              <ul className="row list-unstyled links">
                <li className="col-lg-4"><a href={ROUTES.CONTACT}>Contact</a></li>
                <li className="col-lg-4"><a href="https://www.futsalolympiquebasel.ch/">Web page</a></li>
                <li className="col-lg-4"><a href="https://www.instagram.com/futsalolympiquebasel_offiziell/?hl=es-la">Instagram</a></li>
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