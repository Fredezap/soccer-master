import React from 'react'
import TeamPlayers from './TeamPlayers'
import { useTeamStore } from '../../../../../store/slices/useTeamStore'

const DbTeams = ({ dbTeams, setShowAddTeam, getTeams }) => {
  const { team, setTeam } = useTeamStore()

  const handleTeamClick = (selectedTeam) => {
    setShowAddTeam(false)
    if (selectedTeam.teamId === team.teamId) {
      setTeam({
        teamId: null,
        name: '',
        players: []
      })
    } else {
      setTeam({
        teamId: selectedTeam.teamId,
        name: selectedTeam.name,
        players: selectedTeam.Players
      })
    }
  }

  return (
    <div className="col-lg-6">
      <div className="widget-next-match">
        <table className="table custom-table teams">
          <thead>
            <tr>
              <th>Teams</th>
            </tr>
          </thead>
          <tbody>
            {dbTeams?.map((dbTeam, index) => (
              <React.Fragment key={dbTeam.id || index}>
                <tr
                  className= {`team-name-row ${team.teamId === dbTeam.teamId ? 'selected' : ''}`}
                  onClick={() => handleTeamClick(dbTeam)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <strong className="text-white">{dbTeam.name}</strong>
                  </td>
                </tr>
                {dbTeam.teamId === team.teamId && (
                  <TeamPlayers dbTeam={dbTeam} getTeams={getTeams} />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DbTeams