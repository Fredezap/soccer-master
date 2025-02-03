import { useEffect, useState } from 'react'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'

const TableScores = () => {
  const { currentTournament } = useTournamentsDetails()
  const [groupStages, setGroupStages] = useState([])
  console.log('groupStages', groupStages)

  useEffect(() => {
    const filteredGroupStages = currentTournament.Stages.filter(stage => stage.type === 'group')
    setGroupStages(filteredGroupStages)
  }, [currentTournament])

  return (
    groupStages.length !== 0 && (
      groupStages.map((stage, index) => (
        <div key={stage?.stageId || index} >
          <div className="bg-light p-4 rounded">
            <div className="col-12 title-section">
              <h3 className="heading">{stage?.name}</h3>
            </div>
            <div className="groups-score-data">
              {[...stage.Groups].reverse().map((group, index) => (
                <div key={group?.groupId || index} className="bg-light rounded">
                  <div className="group-title">{group?.name}</div>
                  <table className="table custom-table">
                    <thead>
                      <tr>
                        <th>P</th>
                        <th>Team</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>PTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.Teams.length > 0
                        ? (
                          group.Teams.map((team, index) => (
                            <tr key={team?.teamId || index}>
                              <td>{index + 1}</td>
                              <td><strong className="text-white">{team.name}</strong></td>
                              <td>22</td>
                              <td>3</td>
                              <td>2</td>
                              <td>140</td>
                            </tr>
                          )))
                        : (
                          <tr className="no-info-founded">
                            <td colSpan="6">No info founded</td>
                          </tr>
                        )}
                      {/* <tr>
                <td>1</td>
                <td><strong className="text-white">Football League</strong></td>
                <td>22</td>
                <td>3</td>
                <td>2</td>
                <td>140</td>
              </tr> */}
                    </tbody>
                  </table>
                  {/* {stage.Groups.length - 1 !== index && <hr className="table-score-split"></hr>} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))
    )
  )
}

export default TableScores