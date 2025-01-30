import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import formatDate from '../../common/formatDate'
import formatTime from '../../common/formatTime'
import { useOrderedMatches } from '../../../store/slices/useOrderedMatches'

const NextMatch = () => {
  const location = useLocation()
  const currentPath = location.pathname
  const { currentTournament } = useTournamentsDetails()
  const { matchesByDate } = useOrderedMatches()

  const getNextMatchClass = () => {
    const smallSizeClass = 'col-lg-6'
    const largeSizeClass = 'col-lg-12'
    if (currentPath === '/home') return smallSizeClass
    return largeSizeClass
  }
  console.log('M', matchesByDate)
  return (
    <div className={getNextMatchClass()}>
      <div className="widget-next-match">
        <div className="widget-title">
          <h3>Next Match</h3>
        </div>
        {matchesByDate.length !== 0
          ? (
            <div>
              <div className="widget-body mb-3">
                <div className="widget-vs">
                  <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                    <div className="team-1 text-center">
                      <img src="images/logo_1.png" alt="Team 1"></img>
                      <h3>{matchesByDate[0]?.LocalTeam?.name || 'Team 1'}</h3>
                    </div>
                    <div>
                      <span className="vs"><span>VS</span></span>
                    </div>
                    <div className="team-2 text-center">
                      <img src="images/logo_2.png" alt="Team 2"></img>
                      <h3>{matchesByDate[0]?.VisitorTeam?.name || 'Team 2'}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center widget-vs-contents mb-4">
                <h4>{currentTournament.name || 'Tournament Name'}</h4>
                <p className="mb-5">
                  <span className="d-block">{matchesByDate[0]?.date}</span>
                  <span className="d-block">{matchesByDate[0]?.time} HS</span>
                  <strong className="text-primary">{matchesByDate[0]?.location || 'Unknown Venue'}</strong>
                </p>
              </div>
            </div>
          )
          : (
            <div className="no-match-info-founded">
              <span>No match info founded</span>
            </div>
          )}
      </div>
    </div>
  )
}

export default NextMatch

// todo: agregar esto de abajo y hacerlo funcionar si me sobra tiempo
// todo: no se porque aparece en el home y no en matches, si el componente
// todo: que se esta reenderizando es el mismo

// <div id="date-countdown2" className="pb-1">
// <span className="countdown-block"><span className="label" id="countdown-weeks">0</span> weeks </span>
// <span className="countdown-block"><span className="label" id="countdown-days">0</span> days </span>
// <span className="countdown-block"><span className="label" id="countdown-hours">0</span> hr </span>
// <span className="countdown-block"><span className="label" id="countdown-minutes">0</span> min </span>
// <span className="countdown-block"><span className="label" id="countdown-seconds">0</span> sec</span>
// </div>