/* eslint-disable multiline-ternary */
import { useState } from 'react'
import { Bracket } from 'react-brackets'
import { Button } from 'react-bootstrap'
import EditKnockoutMatchModal from '../modals/EditKnockoutMatchModal'
import DeleteKnockoutMatchModal from '../modals/DeleteKnockoutMatchModal'
import { string } from 'yup'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteForever } from 'react-icons/md'

const Brackets = ({ rounds, dbTeams, getMatches, getKnockoutStages }) => {
  const [match, setMatch] = useState(null)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showListMatches, setShowListMatches] = useState(false)

  const onSetTeams = (match, type) => {
    setMatch(match.match)
    console.log(type)
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
              <p>{seed?.teams[0]?.name}</p>
              <p>VS</p>
              <p>{seed?.teams[1]?.name}</p>
              <CiEdit onClick={() => onSetTeams(seed, 'edit')} className="edit-icon"/>
              <MdDeleteForever onClick={() => onSetTeams(seed, 'delete')} className="delete-icon" />
            </div>
          </div>
        ))}
      </div>
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
                <Bracket rounds={rounds} />
              )}
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