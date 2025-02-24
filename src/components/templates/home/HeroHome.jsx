import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'

const HeroHome = () => {
  const { currentTournament } = useTournamentsDetails()

  return (
    <div className="hero overlay" style={{ backgroundImage: 'url(\'images/bg_3.jpg\')' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 ml-auto">
            <h1 className="text-white">{currentTournament?.name && currentTournament.name}</h1>
            <p>Welcome to the most thrilling football cup event of the year!</p>
            <p className="tournament-time">Tournament starting in:</p>
            <div style={{ margin: '0' }} id="date-countdown">
              <span className="countdown-block"><span className="label" id="countdown-weeks"></span> weeks </span>
              <span className="countdown-block"><span className="label" id="countdown-days"></span> days </span>
              <span className="countdown-block"><span className="label" id="countdown-hours"></span> hr </span>
              <span className="countdown-block"><span className="label" id="countdown-minutes"></span> min </span>
              <span className="countdown-block"><span className="label" id="countdown-seconds"></span> sec</span>
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