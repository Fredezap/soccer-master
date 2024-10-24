const Hero = ({ title, content }) => {
  return (
    <div className="hero overlay" style={{ backgroundImage: 'url(\'images/bg_3.jpg\')' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 mx-auto text-center">
            <h1 className="text-white">{title}</h1>
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero