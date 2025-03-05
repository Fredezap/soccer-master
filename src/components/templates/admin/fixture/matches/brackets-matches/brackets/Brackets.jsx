/* eslint-disable multiline-ternary */
import { useState } from 'react'
import { Bracket, Seed, SeedItem, SeedTeam } from 'react-brackets'
import { Button } from 'react-bootstrap'
import EditKnockoutMatchModal from '../modals/EditKnockoutMatchModal'
import DeleteKnockoutMatchModal from '../modals/DeleteKnockoutMatchModal'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteForever } from 'react-icons/md'

const Brackets = ({ rounds, dbTeams, getMatches, getKnockoutStages }) => {
  const [match, setMatch] = useState(null)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showListMatches, setShowListMatches] = useState(false)

  const onSetTeams = (match, type) => {
    setMatch(match.match)
    if (type === 'edit') setShowModalEdit(true)
    if (type === 'delete') setShowModalDelete(true)
  }

  const renderMatchesList = (round) => {
    return (
      <div className="round" key={round.title}>
        <h6>{round.title}</h6>
        {round.seeds.map((seed) => (
          <div key={seed.id}>
            <div className="match-item">
              <div className="item-teams">
                <p>{seed?.teams[0]?.name}</p>
                <p>VS</p>
                <p>{seed?.teams[1]?.name}</p>
              </div>
              <div className="item-buttons">
                <CiEdit onClick={() => onSetTeams(seed, 'edit')} className="edit-icon"/>
                <MdDeleteForever onClick={() => onSetTeams(seed, 'delete')} className="delete-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const CustomSeed = ({ seed, breakpoint, roundIndex }) => {
    const { matchNumber, date, teams, match } = seed.seed
    return (
      <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
        <SeedItem>
          <div>
            <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '0px', backgroundColor: 'gray' }}>
              Match {matchNumber}
            </div>
            <SeedTeam className="seed-team">
              <span>{teams[0]?.name || 'NO TEAM'}</span>
              <span>
                {match.localTeamScore ? match.localTeamScore : match.localTeamScore === 0 ? '0' : '(-)'}
                {' '}
                {match.localTeamPenaltyScore !== null && match.localTeamPenaltyScore !== undefined
                  ? `(${match.localTeamPenaltyScore})`
                  : match.localTeamPenaltyScore === 0
                    ? '(0)'
                    : null}
              </span>
            </SeedTeam>
            <SeedTeam className="seed-team">
              <span>{teams[1]?.name || 'NO TEAM'}</span>
              <span>
                {match.visitorTeamScore ? match.visitorTeamScore : match.visitorTeamScore === 0 ? '0' : '(-)'}
                {' '}
                {match.visitorTeamPenaltyScore !== null && match.visitorTeamPenaltyScore !== undefined
                  ? `(${match.visitorTeamPenaltyScore})`
                  : match.visitorTeamPenaltyScore === 0
                    ? '(0)'
                    : null}
              </span>
            </SeedTeam>
          </div>
        </SeedItem>
        <div style={{ marginTop: '5px', fontSize: '10px', textAlign: 'center' }}>
          {date}
        </div>
        {roundIndex !== 0 && <div></div>}
      </Seed>
    )
  }

  return (
    <div className="brackets-container">
      {Array.isArray(rounds) && rounds.length > 0
        ? (
          <div className="brackets-box">
            {rounds.every((round) => round.seeds.length === 0)
              ? (
                <p>No matches set for any knockout stage yet</p>
              )
              : (
                <div className="bracket">
                  <Bracket
                    rounds={rounds}
                    renderSeedComponent={(seed) => <CustomSeed seed={seed} breakpoint={992} />
                    }
                  />
                  <div>
                    <Button
                      onClick={() => setShowListMatches(!showListMatches)}
                      variant="outline-success"
                    >
                      Manage knockout matches
                    </Button>
                  </div>
                  {showListMatches && (
                    <div className="knockout-matches-list-edit">
                      <h6>Select a match</h6>
                      {rounds.map(renderMatchesList)}
                    </div>
                  )}
                </div>
              )}
          </div>
        ) : (
          <p>No bracket data available</p>
        )}
      {showModalEdit && (
        <EditKnockoutMatchModal
          getMatches={getMatches}
          getKnockoutStages={getKnockoutStages}
          match={match}
          dbTeams={dbTeams}
          showModalEdit={showModalEdit}
          setShowModalEdit={setShowModalEdit}
          rounds={rounds}
        />
      )}
      {showModalDelete && (
        <DeleteKnockoutMatchModal
          getMatches={getMatches}
          getKnockoutStages={getKnockoutStages}
          match={match}
          showModalDelete={showModalDelete}
          setShowModalDelete={setShowModalDelete}
        />
      )}
    </div>
  )
}

export default Brackets