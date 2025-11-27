import { sponsors } from '../../../../images/Logo_Sponsors/logosIndex'

const SponsorsSection = () => {
  return (
    <div className="centered sponsors-section">
      <h1>UNSERE FÖRDERPARTNER</h1>
      <div className="sponsors">
        <div className="grid-top">
          <img src={sponsors.sponsor1} alt="sponsor" className="item"></img>
          <img src={sponsors.sponsor2} alt="sponsor" className="item"></img>
          <img src={sponsors.sponsor3} alt="sponsor" className="item"></img>
        </div>
        <div className="grid-bottom">
          <img src={sponsors.sponsor4} alt="sponsor" className="item"></img>
          <img src={sponsors.sponsor5} alt="sponsor" className="item"></img>
        </div>
      </div>
    </div>
  )
}

export default SponsorsSection