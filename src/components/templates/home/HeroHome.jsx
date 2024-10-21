import { useEffect, useState } from 'react'
import siteCountDownForTournament from '../../../js/main/site/siteCountDownForTournament'

const HeroHome = () => {
  const [tournamentTimeHasFinished, setTournamentTimeHasFinished] = useState(false)

  // const getTournamentStartingTime = () => {
  //   // todo: Get the time from db and check it to set the states
  //   const tournamentStartingTime = axios.get("api/get-tournament-time")

  //   const now = new Date()
  //   const remaining = tournamentStartingTime - now
  //   if (remaining <= 0) {
  //     setTournamentTimeHasFinished(true)
  //     return
  //   }

  //   siteCountDownForTournament()
  // }

  // useEffect(() => {
  //   getTournamentStartingTime()
  // }, [])

  return (
    <div className="hero overlay" style={{ backgroundImage: 'url(\'images/bg_3.jpg\')' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 ml-auto">
            <h1 className="text-white">Swetserland Cup Event</h1>
            <p>Welcome to the most thrilling football cup event of the year!</p>
            {!tournamentTimeHasFinished && (
              <div id="date-countdown">
                <span className="countdown-block"><span className="label" id="countdown-weeks">0</span> weeks </span>
                <span className="countdown-block"><span className="label" id="countdown-days">0</span> days </span>
                <span className="countdown-block"><span className="label" id="countdown-hours">0</span> hr </span>
                <span className="countdown-block"><span className="label" id="countdown-minutes">0</span> min </span>
                <span className="countdown-block"><span className="label" id="countdown-seconds">0</span> sec</span>
              </div>
            )}
            <p>
              <a href="#" className="btn btn-primary py-3 px-4 mr-3">Book Ticket</a>
              <a href="#" className="more light">Learn More</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroHome