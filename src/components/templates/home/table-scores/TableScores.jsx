import { useEffect, useState } from 'react'
import { useTournamentsDetails } from '../../../../store/slices/useTournamentsDetails'

const BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_IMG_DEV_BASE_URL
  : import.meta.env.VITE_IMG_PROD_BASE_URL

const TableScores = ({ backgroundStyle }) => {
  const { currentTournament } = useTournamentsDetails()
  const [groupStages, setGroupStages] = useState([])

  useEffect(() => {
    const filteredGroupStages = currentTournament?.Stages?.filter(
      stage => stage.type === 'group'
    )

    setGroupStages(filteredGroupStages)
  }, [currentTournament])

  return (
    groupStages.length !== 0 && (
      groupStages.map((stage, index) => (
        <div style={{ marginBottom: '30px' }} key={stage?.stageId || index} >
          <div className={`${backgroundStyle}`}>
            <div className="col-12 title-section">
              <h3 className="heading">{stage?.name}</h3>
            </div>
            <div className="groups-score-data">
              {stage?.Groups?.length > 0
                ? (
                  [...stage.Groups].map((group, index) => (
                    <div key={group?.groupId || index} className="bg-light rounded table-container">
                      <div className="group-wrapper">
                        <div className="group-title">{group?.name}</div>
                        {group.Teams.length > 0
                          ? (
                            <div className="table-responsive">
                              <table className="table custom-table">
                                <thead>
                                  <tr>
                                    <th>P</th>
                                    <th>Team</th>
                                    <th>GP</th>
                                    <th>W</th>
                                    <th>D</th>
                                    <th>L</th>
                                    <th>GF</th>
                                    <th>GA</th>
                                    <th>GD</th>
                                    <th>PTS</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {group.Teams.map((team, index) => (
                                    <tr key={team?.teamId || index}>
                                      <td>{index + 1}</td>
                                      <td className="team-score-logo">
                                        <div>
                                          {BASE_URL && team?.logoUrl &&
                                        (
                                          <img src={`${BASE_URL}${team.logoUrl?.trim()}?t=${Date.now()}`} alt="Team 1"></img>
                                        )
                                          }
                                        </div>
                                        <strong className="text-white team-score-name">{team.name}</strong>
                                      </td>
                                      <td>{team.TeamGroup.WON + team.TeamGroup.DRAWN + team.TeamGroup.LOST}</td>
                                      <td>{team.TeamGroup.WON}</td>
                                      <td>{team.TeamGroup.DRAWN}</td>
                                      <td>{team.TeamGroup.LOST}</td>
                                      <td>{team.TeamGroup.goalsFor}</td>
                                      <td>{team.TeamGroup.goalsAgainst}</td>
                                      <td>{team.TeamGroup.goalDifference}</td>
                                      <td>{team.TeamGroup.totalTeamPoints}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )
                          : (
                            <div className="no-info-founded">
                              <p>No teams founded</p>
                            </div>
                          )}
                      </div>
                    </div>
                  ))
                )
                : (
                  <div className="no-info-founded">
                    <p>No groups founded</p>
                  </div>
                )}
            </div>
          </div>
        </div>
      ))
    )
  )
}

export default TableScores