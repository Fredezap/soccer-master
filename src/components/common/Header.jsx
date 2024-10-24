import ROUTES from '../../store/constants/routes.js'

const Header = () => {
  return (
    <header className="site-navbar py-4" role="banner">
      <div className="container">
        <div className="d-flex align-items-center">
          <div className="site-logo">
            <a href={ROUTES.HOME}>
              <img src="images/logo.png" alt="Logo" />
            </a>
          </div>
          <div className="ml-auto">
            <nav className="site-navigation position-relative text-right" role="navigation">
              <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                <li className="active"><a href={ROUTES.HOME} className="nav-link">Home</a></li>
                <li><a href={ROUTES.MATCHES} className="nav-link">Matches</a></li>
                <li><a href={ROUTES.PLAYERS} className="nav-link">Players</a></li>
                <li><a href={ROUTES.BLOG} className="nav-link">Blog</a></li>
                <li><a href={ROUTES.CONTACT} className="nav-link">Contact</a></li>
              </ul>
            </nav>

            <a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white">
              <span className="icon-menu h3 text-white"></span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header