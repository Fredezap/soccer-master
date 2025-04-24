import React from 'react'
import TeamPlayers from './TeamPlayers'
import { useTeamStore } from '../../../../../store/slices/useTeamStore'

const BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_IMG_DEV_BASE_URL
  : import.meta.env.VITE_IMG_PROD_BASE_URL

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
                  dbTeam.logoUrl && dbTeam.logoUrl.trim()
                    ? (
                      <tr className="team-logo-form team-list">
                        <td style={{ borderBottom: 'none' }} colSpan="2">
                          <img src={`${BASE_URL}${dbTeam.logoUrl.trim()}?t=${Date.now()}`} alt="Image" />
                        </td>
                      </tr>
                    )
                    : (
                      <tr>
                        <td colSpan="2">No logo added yet</td>
                      </tr>
                    )
                )}

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