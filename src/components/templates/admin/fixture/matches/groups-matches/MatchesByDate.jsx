import { MdDeleteForever } from 'react-icons/md'
import DeleteMatchModal from './modals/DeleteMatchModal'
import { useState } from 'react'

const MatchesByDate = ({ stageGroups, selectedGroupStage, groupedMatches, getStages }) => {
  const [showDeleteMatchModal, setShowDeleteMatchModal] = useState(false)
  const [matchId, setMatchId] = useState(null)

  const handleDeleteMatch = (matchId) => {
    setMatchId(matchId)
    setShowDeleteMatchModal(true)
  }

  return (
    <div className="group-box">
      {selectedGroupStage && (
        <div>
          <div className="col-lg-12">
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
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {matches.map((match, index) => (
                          <tr className="match-table-row" key={match.matchId || index}>
                            <td><strong className="text-white">{index + 1}</strong></td>
                            <td>{match.LocalTeam.Groups.find(group => group.stageId === stageGroups.stageId)?.name || 'No Group'}</td>
                            <td><strong className="text-white">{match.time}</strong></td>
                            <td><strong className="text-white">{match.LocalTeam.name}</strong></td>
                            <td><strong className="text-white">VS</strong></td>
                            <td><strong className="text-white">{match.VisitorTeam.name}</strong></td>
                            <td><strong className="text-white">{match.location}</strong></td>
                            <td><div onClick={() => handleDeleteMatch(match.matchId)} className="delete-icon-match"><MdDeleteForever /></div></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {showDeleteMatchModal && <DeleteMatchModal
        showDeleteMatchModal={showDeleteMatchModal}
        setShowDeleteMatchModal={setShowDeleteMatchModal}
        matchId={matchId}
        getStages={getStages}
      />
      }
    </div>
  )
}

export default MatchesByDate