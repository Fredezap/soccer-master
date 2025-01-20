import { MdDeleteForever } from 'react-icons/md'
import formatTime from '../../../../../common/formatTime'
import { CiEdit } from 'react-icons/ci'

const MatchesByDate = ({ stageGroups, selectedGroupStage, groupedMatches, handleShowModal }) => {
  return (
    <div className="group-matches-details">
      {selectedGroupStage && (
        <div>
          {selectedGroupStage.Matches?.length === 0
            ? <p style={{ textAlign: 'center' }}>No matches set for this group stage yet</p>
            : Object.entries(groupedMatches).map(([date, matches]) => (
              <div className="widget-next-match matches matches-by-date" key={date}>
                <h4 className="text-white">{date}</h4>
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
                        <td><strong className="text-white">{index + 1}</strong></td>
                        <td>{match.LocalTeam.Groups.find(group => group.stageId === stageGroups.stageId)?.name || 'No Group'}</td>
                        <td><strong className="text-white">{formatTime(match.time)}</strong></td>
                        <td><strong className="text-white">{match.LocalTeam.name}</strong></td>
                        <td><strong className="text-white">VS</strong></td>
                        <td><strong className="text-white">{match.VisitorTeam.name}</strong></td>
                        <td><strong className="text-white">{match.location}</strong></td>
                        <td className="actions-column">
                          <div className="actions-icons">
                            <MdDeleteForever onClick={() => handleShowModal(match, 'delete')} className="delete-icon" />
                            <CiEdit onClick={() => handleShowModal(match, 'edit')} className="edit-icon" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default MatchesByDate