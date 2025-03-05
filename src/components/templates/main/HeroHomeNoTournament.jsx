import bgImage from '../../../../src/images/bg_3.jpg'

const HeroHomeNoTournament = () => {
  return (
    <div className="hero custom-hero" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="container">
        <div>
          <div className="no-tournament-main">
            <h1>Welcome to Futsal For Her</h1>
            <h2>Basel futsal</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroHomeNoTournament