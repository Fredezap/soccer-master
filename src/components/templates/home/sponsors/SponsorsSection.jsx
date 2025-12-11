import { sponsors } from '../../../../images/Logo_Sponsors/logosIndex'

const SponsorsSection = () => {
  return (
    <div className="centered sponsors-section">
      <h1>UNSERE FÖRDERPARTNER</h1>
      <div className="sponsors">
        <img src={sponsors.sponsor1} alt="sponsor" />
        <img src={sponsors.sponsor2} alt="sponsor" />
        <img src={sponsors.sponsor3} alt="sponsor" />
        <img src={sponsors.sponsor4} alt="sponsor" />
        <img src={sponsors.sponsor5} alt="sponsor" />
        <img src={sponsors.sponsor6} alt="sponsor" />
      </div>
    </div>
  )
}

export default SponsorsSection