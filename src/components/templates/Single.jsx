const Single = () => {
  return (
    <div className="site-wrap">
      {/* Mobile Menu */}
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>

      {/* Header */}
      <header className="site-navbar py-4" role="banner">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="site-logo">
              <a href="index.html">
                <img src="images/logo.png" alt="Logo" />
              </a>
            </div>
            <div className="ml-auto">
              <nav className="site-navigation position-relative text-right" role="navigation">
                <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li><a href="index.html" className="nav-link">Home</a></li>
                  <li><a href="matches.html" className="nav-link">Matches</a></li>
                  <li><a href="players.html" className="nav-link">Players</a></li>
                  <li className="active"><a href="blog.html" className="nav-link">Blog</a></li>
                  <li><a href="contact.html" className="nav-link">Contact</a></li>
                </ul>
              </nav>
              <a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white">
                <span className="icon-menu h3 text-white"></span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero overlay" style={{ backgroundImage: 'url(\'images/bg_3.jpg\')' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9 mx-auto text-center">
              <h1 className="text-white">Romolu to stay at Real Nadrid?</h1>
              <p><span>May 20, 2020</span> <span className="mx-3">&bullet;</span> <span>by Admin</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="site-section first-section">
        <div className="container">
          <div className="row">
            <div className="col-md-8 blog-content">
              <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              <p><img src="images/img_1.jpg" alt="Image" className="img-fluid" /></p>

              <blockquote><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p></blockquote>

              <p>Eveniet deleniti accusantium...</p>
              <p><img src="images/img_2.jpg" alt="Image" className="img-fluid" /></p>

              <div className="pt-5">
                <p>Categories:  <a href="#">HTML5</a>, <a href="#">Bootstrap 4</a>  Tags: <a href="#">#html</a>, <a href="#">#trends</a></p>
              </div>

              {/* Comments */}
              <div className="pt-5">
                <h3 className="mb-5 text-white">6 Comments</h3>
                <ul className="comment-list">
                  <li className="comment">
                    <div className="vcard bio">
                      <img src="images/person_1.jpg" alt="Image placeholder" />
                    </div>
                    <div className="comment-body">
                      <h3>Jean Doe</h3>
                      <div className="meta">January 9, 2018 at 2:21pm</div>
                      <p>Lorem ipsum dolor sit amet...</p>
                      <p><a href="#" className="reply">Reply</a></p>
                    </div>
                  </li>
                  {/* Repetir otras secciones de comentarios */}
                </ul>

                {/* Comment Form */}
                <div className="comment-form-wrap pt-5">
                  <h3 className="mb-5">Leave a comment</h3>
                  <form action="#" className="p-5 bg-light">
                    <div className="form-group">
                      <label htmlFor="name">Name *</label>
                      <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="website">Website</label>
                      <input type="url" className="form-control" id="website" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea name="message" id="message" cols="30" rows="10" className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                      <input type="submit" value="Post Comment" className="btn btn-primary py-3 px-4 text-white" />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-4 sidebar">
              <div className="sidebar-box">
                <form action="#" className="search-form">
                  <div className="form-group">
                    <span className="icon fa fa-search"></span>
                    <input type="text" className="form-control" placeholder="Type a keyword and hit enter" />
                  </div>
                </form>
              </div>
              {/* Repite otras secciones del sidebar */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="widget mb-3">
                <h3>News</h3>
                <ul className="list-unstyled links">
                  <li><a href="#">All</a></li>
                  <li><a href="#">Club News</a></li>
                  <li><a href="#">Media Center</a></li>
                  <li><a href="#">Video</a></li>
                  <li><a href="#">RSS</a></li>
                </ul>
              </div>
            </div>
            {/* Repetir secciones de widgets */}
          </div>
          <div className="row text-center">
            <div className="col-md-12">
              <div className="pt-5">
                <p>
                  &copy; {new Date().getFullYear()} All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Single