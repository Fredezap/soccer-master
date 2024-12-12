import { Button } from 'react-bootstrap'

const TeamStatus = ({ setTeamStatus, TEAM_STATUS }) => {
  return (
    <div className="define-status">
      <Button variant="outline-info" onClick={() => setTeamStatus(TEAM_STATUS.KNOWN)}>
        I know the teams
      </Button>
      <Button variant="outline-info" onClick={() => setTeamStatus(TEAM_STATUS.UNKNOWN)}>
        I do not know the teams
      </Button>
    </div>
  )
}

export default TeamStatus