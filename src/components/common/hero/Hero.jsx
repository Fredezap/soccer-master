import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'

const Hero = ({ title }) => {
  const { currentTournament } = useTournamentsDetails()

  return (
    <div className="hero overlay" style={{ backgroundImage: 'url(\'images/bg_3.jpg\')' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg mx-auto text-center">
            <h1 className="text-white">{title || null}</h1>
            <h2 style={{ marginTop: '50px' }}>{currentTournament?.name}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero