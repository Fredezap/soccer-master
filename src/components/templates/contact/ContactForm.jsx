const ContactForm = () => {
  return (
    <div className="bg-dark site-section">
      <div className="container">
        <div className="row">
          {/* <div className="col-lg-7">
            <form action="#">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Name" />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Email" />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Subject" />
              </div>
              <div className="form-group">
                <textarea className="form-control" cols="30" rows="10" placeholder="Write something..."></textarea>
              </div>
              <div className="form-group">
                <input type="submit" className="btn btn-primary py-3 px-5" value="Send Message" />
              </div>
            </form>
          </div> */}
          <div className="col-lg-12 ml-auto">
            <ul className="list-unstyled">
              <li className="mb-2">
                <strong className="text-white d-block">Address</strong>
                  AGREGAR LA DIRE DEL CLUB. <br /> Basel, Switzerland
              </li>
              <li className="mb-2">
                <strong className="text-white d-block">Email</strong>
                <a href="#">stephanie.capomolla@kigaprima.ch</a>
              </li>
              <li className="mb-2">
                <strong className="text-white d-block">Phone</strong>
                <a href="#">+41 79 455 50 32</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm