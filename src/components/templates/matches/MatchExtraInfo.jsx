import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'

const MatchExtraInfo = ({ match }) => {
  const { currentTournament } = useTournamentsDetails()
  const foundStage = currentTournament.Stages.find(stage => stage.stageId === match.stageId)

  return (
    <div className="text-center widget-vs-contents mb-4">
      <h4>{foundStage.name || ''}</h4>
      <p className="mb-5">
        <span className="d-block">{match?.date}</span>
        <span className="d-block">{match?.time} HS</span>
        <strong className="text-primary">{match?.location || 'Unknown Venue'}</strong>
      </p>
    </div>
  )
}

export default MatchExtraInfo