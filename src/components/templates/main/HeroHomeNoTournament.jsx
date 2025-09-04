import bgImage from '../../../../src/images/bg_3.jpg'
import futsalForHerBackground1 from '../../../../src/images/futsalForHerBackground1.png'
import futsalForHerBackground2 from '../../../../src/images/futsalForHerBackground2.png'

const HeroHomeNoTournament = () => {
  return (
    <div className="hero custom-hero" style={{ backgroundImage: `url(${futsalForHerBackground2})` }}>
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