import { useState, useEffect } from 'react'

const TeamsAreKnownForm = ({ match, dbTeams, setLocalTeam, setVisitorTeam }) => {
  const [localTeamValue, setLocalTeamValue] = useState('')
  const [visitorTeamValue, setVisitorTeamValue] = useState('')

  useEffect(() => {
    if (match?.localTeam) {
      const localTeamId = match.localTeam.teamId.toString()
      setLocalTeamValue(localTeamId)
      setLocalTeam(dbTeams.find((t) => t.teamId === parseInt(localTeamId)) || null)
    }
  }, [match, dbTeams, setLocalTeam])

  useEffect(() => {
    if (match?.visitorTeam) {
      const visitorTeamId = match.visitorTeam.teamId.toString()
      setVisitorTeamValue(visitorTeamId)
      setVisitorTeam(dbTeams.find((t) => t.teamId === parseInt(visitorTeamId)) || null)
    }
  }, [match, dbTeams, setVisitorTeam])

  const handleTeamChange = ({ teamType, event }) => {
    const teamId = event.target.value
    const selectedTeam = dbTeams.find((t) => t.teamId === parseInt(teamId)) || null

    if (teamType === 'local') {
      setLocalTeam(selectedTeam)
      setLocalTeamValue(teamId)
    } else if (teamType === 'visitor') {
      setVisitorTeam(selectedTeam)
      setVisitorTeamValue(teamId)
    }
  }

  return (
    <div className="knockout-matches-select">
      {/* Select local team */}
      <select
        className="group-select"
        onChange={(event) => handleTeamChange({ teamType: 'local', event })}
        value={localTeamValue}
      >
        <option value="">Select a team</option>
        {dbTeams.map((team) => (
          <option key={team.teamId} value={team.teamId}>
            {team.name}
          </option>
        ))}
      </select>

      <p style={{ margin: '0' }}>VS</p>

      {/* Select visitor team */}
      <select
        className="group-select"
        onChange={(event) => handleTeamChange({ teamType: 'visitor', event })}
        value={visitorTeamValue}
      >
        <option value="">Select a team</option>
        {dbTeams.map((team) => (
          <option key={team.teamId} value={team.teamId}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TeamsAreKnownForm