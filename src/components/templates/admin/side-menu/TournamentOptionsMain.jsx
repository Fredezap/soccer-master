import { Button } from 'react-bootstrap'
import { useSideMenuStore } from '../../../../store/slices/useSideMenuStore'
import { useTournamentsDetails } from '../../../../store/slices/useTournamentsDetails'
import TournamentDetailsOptions from '../tournament-details/TournamentDetailsOptions'

const TournamentOptionsMain = () => {
  const { showTournamentOptions, setShowTournamentOptions } = useSideMenuStore()
  const { currentTournament } = useTournamentsDetails()

  return (
    <div className="tournament-options bg-lights">
      <h4>
        <Button className="options-btn" onClick={() => setShowTournamentOptions(!showTournamentOptions)}>
          {showTournamentOptions ? 'Hide tournament details' : 'See tournament details'}
        </Button>
      </h4>
      {showTournamentOptions && (
        Object.keys(currentTournament).length
          ? (
            <div className="options-main-box">
              <div>
                <span style={{ fontWeight: 'bold' }}>
              Current tournament:
                </span>
                <p>
                  {currentTournament.name ? `${currentTournament.name}` : 'Tournament name not found'}
                </p>

              </div>
              <div>

              </div>
              {showTournamentOptions && (<TournamentDetailsOptions />)}
            </div>
          )
          : (
            <div>
              <p>No tournament selected</p>
              <p>{currentTournament.lenght}</p>
            </div>
          ))}
    </div>
  )
}

export default TournamentOptionsMain