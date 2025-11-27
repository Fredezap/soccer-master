import { CiEdit } from 'react-icons/ci'
import { IoFootballOutline } from 'react-icons/io5'
import { MdDeleteForever } from 'react-icons/md'

const BracketMatchesList = ({ rounds, onSetTeams, isGoalSeter }) => {
  return (
    rounds.map((round, index) => (
      <div className="round" key={round.title}>
        <h6>{round.title}</h6>
        {round.seeds.map((seed) => (
          <div key={seed.id}>
            <div className="match-item">
              <div className="match-detail">
                <span style={{ fontWeight: 'bold' }}>Match {seed.matchNumber}</span>
                <p>{seed?.teams[0]?.name}</p>
                <p>
                  {seed?.match?.localTeamScore != null
                    ? `${seed.match.localTeamScore}${seed.match?.localTeamPenaltyScore != null ? ` (${seed.match.localTeamPenaltyScore})` : ''}`
                    : '(-)'}
                </p>
                <p>VS</p>
                <p>{seed?.teams[1]?.name}</p>
                <p>
                  {seed?.match?.visitorTeamScore != null
                    ? `${seed.match.visitorTeamScore}${seed.match?.visitorTeamPenaltyScore != null ? ` (${seed.match.visitorTeamPenaltyScore})` : ''}`
                    : '(-)'}
                </p>
              </div>
              <div className="item-buttons">
                {!isGoalSeter
                  ? (
                    <div>
                      <CiEdit onClick={() => onSetTeams(seed, 'edit')} className="edit-icon"/>
                      <MdDeleteForever onClick={() => onSetTeams(seed, 'delete')} className="delete-icon" />
                    </div>
                  )
                  : (
                    <IoFootballOutline onClick={() => onSetTeams(seed, 'set-score')} style={{ fontSize: '20px', color: 'skyblue', cursor: 'pointer' }}/>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    ))
  )
}

export default BracketMatchesList