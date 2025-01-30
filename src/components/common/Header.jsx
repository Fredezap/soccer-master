import ROUTES from '../../store/constants/routes.js'
import useCurrentRouteStore from '../../store/slices/useCurrentRouteStore.js'

const Header = () => {
  const { current } = useCurrentRouteStore()

  const getClass = function(route) {
    let activateClass = ''
    if (current === route) activateClass = 'active'
    return activateClass
  }

  const adminUser = globalThis.localStorage.getItem('user')

  return (
    <header className="site-navbar py-4" role="banner">
      <div className="container">
        <div className="d-flex align-items-center">
          <div className="site-logo">
            <a href={ROUTES.MAIN}>
              <img src="images/logo.png" alt="Logo" />
            </a>
          </div>
          <div className="ml-auto">
            <nav className="site-navigation position-relative text-right" role="navigation">
              <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                <li className={getClass(ROUTES.HOME)}><a href={ROUTES.HOME} className="nav-link">Home</a></li>
                <li className={getClass(ROUTES.MATCHES)}><a href={ROUTES.MATCHES} className="nav-link">Matches</a></li>
                <li className={getClass(ROUTES.TEAMS)}><a href={ROUTES.TEAMS} className="nav-link">Teams</a></li>
                {/* <li className={getClass(ROUTES.BLOG)}><a href={ROUTES.BLOG} className="nav-link">Blog</a></li> */}
                <li className={getClass(ROUTES.CONTACT)}><a href={ROUTES.CONTACT} className="nav-link">Contact</a></li>
                {adminUser &&
                  (<li className={getClass(ROUTES.ADMIN.MAIN)}>
                    <a href={ROUTES.ADMIN.MAIN} className="nav-link">
                    Admin
                    </a>
                  </li>
                  )}
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