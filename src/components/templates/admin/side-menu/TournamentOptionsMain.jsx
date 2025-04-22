import { Button } from 'react-bootstrap'
import { useSideMenuStore } from '../../../../store/slices/useSideMenuStore'
import { useTournamentsDetails } from '../../../../store/slices/useTournamentsDetails'
import TournamentDetailsOptions from '../tournament-details/TournamentDetailsOptions'

const TournamentOptionsMain = () => {
  const { showTournamentOptions, setShowTournamentOptions } = useSideMenuStore()
  const { currentTournament } = useTournamentsDetails()

  console.log('LARGO', Object.keys(currentTournament).length)

  console.log('TORNEO', currentTournament)
  // todo: chequear las reedirecciones. Me deja de mostrar el header.
  // todo: Hacer que los otrneos se escondan al elegir uno. Osea sacarlo del zustand

  return (
    <div className="tournament-options bg-lights">
      <h4>
        <Button variant="light" onClick={() => setShowTournamentOptions(!showTournamentOptions)}>
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