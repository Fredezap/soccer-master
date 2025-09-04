import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import deafultTournamentImage from '../../../../src/images/bg_3.jpg'

const BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_IMG_DEV_BASE_URL
  : import.meta.env.VITE_IMG_PROD_BASE_URL

const Hero = ({ title }) => {
  const { currentTournament } = useTournamentsDetails()

  const tournamentImage = currentTournament?.mainBgImg
    ? `${BASE_URL}${currentTournament.mainBgImg}`
    : deafultTournamentImage

  return (
    <div className="hero overlay" style={{ backgroundImage: `url(${tournamentImage})` }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg mx-auto text-center">
            <h1 className="text-futsal-for-her">{title || null}</h1>
            <h2 style={{ marginTop: '50px' }}>{currentTournament?.name}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero