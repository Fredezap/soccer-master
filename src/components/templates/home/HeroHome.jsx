import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import deafultTournamentImage from '../../../../src/images/bg_3.jpg'

const BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_IMG_DEV_BASE_URL
  : import.meta.env.VITE_IMG_PROD_BASE_URL

const HeroHome = () => {
  const { currentTournament } = useTournamentsDetails()

  const tournamentImage = currentTournament?.mainBgImg
    ? `${BASE_URL}${currentTournament?.mainBgImg}`
    : deafultTournamentImage

  return (
    <div className="hero overlay" style={{ backgroundImage: `url(${tournamentImage})` }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 ml-auto">
            <h1 className="text-futsal-for-her">{currentTournament?.name && currentTournament.name}</h1>
            {/* <p>Welcome to the most thrilling football cup event of the year!</p> */}
            <p>Willkommen zum spannendsten Fußball-Cup-Event des Jahres!</p>
            {/* <p className="tournament-time">Tournament starting in:</p> */}
            <p className="tournament-time">Turnier beginnt in:</p>
            <div style={{ margin: '0' }} id="date-countdown">
              {/* <span className="countdown-block"><span className="label" id="countdown-weeks"></span> weeks </span>
              <span className="countdown-block"><span className="label" id="countdown-days"></span> days </span>
              <span className="countdown-block"><span className="label" id="countdown-hours"></span> hr </span>
              <span className="countdown-block"><span className="label" id="countdown-minutes"></span> min </span>
              <span className="countdown-block"><span className="label" id="countdown-seconds"></span> sec</span> */}
              <span className="countdown-block"><span className="label" id="countdown-weeks"></span> Wochen </span>
              <span className="countdown-block"><span className="label" id="countdown-days"></span> Tage </span>
              <span className="countdown-block"><span className="label" id="countdown-hours"></span> Std </span>
              <span className="countdown-block"><span className="label" id="countdown-minutes"></span> Min </span>
              <span className="countdown-block"><span className="label" id="countdown-seconds"></span> Sek</span>
            </div>
            <h5 id="date-countdown2"></h5>
            {/* <p> */}
            {/* <a href="#" className="btn btn-primary py-3 px-4 mr-3">Book Ticket</a> */}
            {/* <a href="#" className="more light">Learn More</a> */}
            {/* </p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroHome