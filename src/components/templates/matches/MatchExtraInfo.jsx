import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'

const MatchExtraInfo = ({ match, isNextMatch }) => {
  const { currentTournament } = useTournamentsDetails()
  const foundStage = currentTournament?.Stages?.find(stage => stage.stageId === match?.stageId)

  return (
    <div className="text-center widget-vs-contents">
      <h4>{foundStage?.name || ''}</h4>
      <p className="mb-4">
        <span className="d-block">{match?.date}</span>
        <span className="d-block">{match?.time} HS</span>
        <strong className="text-primary">{match?.location || 'Unknown Venue'}</strong>
      </p>
      {isNextMatch && (
        <div>
          <div id="match-countdown" className="pb-1">
            <span className="countdown-block"><span className="label" id="match-countdown-weeks">0</span> weeks </span>
            <span className="countdown-block"><span className="label" id="match-countdown-days">0</span> days </span>
            <span className="countdown-block"><span className="label" id="match-countdown-hours">0</span> hr </span>
            <span className="countdown-block"><span className="label" id="match-countdown-minutes">0</span> min </span>
            <span className="countdown-block"><span className="label" id="match-countdown-seconds">0</span> sec</span>
          </div>
          <h5 id="match-countdown2"></h5>
        </div>
      )}
    </div>
  )
}

export default MatchExtraInfo