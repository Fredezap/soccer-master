import { MdDeleteForever } from 'react-icons/md'
import formatTime from '../../../../../common/formatTime'
import { CiEdit } from 'react-icons/ci'
import { IoFootballOutline } from 'react-icons/io5'

const MatchesByDate = ({ isGoalSeter, stageGroups, selectedGroupStage, groupedMatches, handleShowModal, backgroundStyle }) => {
  return (
    <div className="group-matches-details">
      {selectedGroupStage && (
        <>
          {selectedGroupStage.Matches?.length === 0
            ? <p style={{ textAlign: 'center' }}>No matches set for this group stage yet</p>
            : Object.entries(groupedMatches)
              .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB)) // Ordena por fecha
              .map(([date, matches]) => (
                <div key={date} className={`date-details ${backgroundStyle}`}>
                  <div className="col-12 title-section">
                    <h3 className="heading">{date}</h3>
                  </div>
                  <div className="groups-score-data">
                    <div className="bg-light rounded table-container">
                      <div className="group-wrapper">
                        <div className="table-responsive">
                          <table className="table custom-table teams">
                            <thead>
                              <tr>
                                <th>Match</th>
                                <th>Group</th>
                                <th>Time</th>
                                <th>Local Team</th>
                                <th></th>
                                <th>Visitor Team</th>
                                <th>Location</th>
                                <th className="actions-column">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {matches.map((match, index) => (
                                <tr className="match-table-row" key={match.matchId || index}>
                                  <td><strong className="text-futsal-for-her">{index + 1}</strong></td>
                                  <td>{match.LocalTeam.Groups.find(group => group.stageId === stageGroups.stageId)?.name || 'No Group'}</td>
                                  <td><strong className="text-futsal-for-her">{formatTime(match.time)}</strong></td>
                                  <td className="team-score-logo">
                                    <strong className="text-futsal-for-her">{match.LocalTeam.name}</strong>
                                    <strong className="text-futsal-for-her">{match.localTeamScore !== null ? `(${match.localTeamScore})` : '(-)'}</strong>
                                  </td>
                                  <td><strong className="text-futsal-for-her">VS</strong></td>
                                  <td className="team-score-logo">
                                    <strong className="text-futsal-for-her">{match.VisitorTeam.name}</strong>
                                    <strong className="text-futsal-for-her">{match.visitorTeamScore !== null ? `(${match.visitorTeamScore})` : '(-)'}</strong>
                                  </td>
                                  <td><strong className="text-futsal-for-her">{match.location}</strong></td>
                                  <td className="actions-column">
                                    <div className="actions-icons">
                                      {!isGoalSeter
                                        ? (
                                          <div>
                                            <MdDeleteForever onClick={() => handleShowModal(match, 'delete')} className="delete-icon" />
                                            <CiEdit onClick={() => handleShowModal(match, 'edit')} className="edit-icon" />
                                          </div>
                                        )
                                        : (
                                          <IoFootballOutline onClick={() => handleShowModal(match, 'set-score')} style={{ fontSize: '20px' }}/>
                                        )
                                      }
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </>
      )}
    </div>
  )
}

export default MatchesByDate