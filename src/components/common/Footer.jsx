const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div style={{ textAlign: 'center' }} className="row">
          <div className="col-lg-12">
            <div className="widget mb-3">
              <h3>Social</h3>
              <ul className="row list-unstyled links">
                <li className="col-lg-4"><a href="#">Contact</a></li>
                <li className="col-lg-4"><a href="#">Web page</a></li>
                <li className="col-lg-4"><a href="#">Instagram</a></li>
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