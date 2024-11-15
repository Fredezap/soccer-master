import React from 'react'
import { Button } from 'react-bootstrap'
import { MdDeleteForever } from 'react-icons/md'
import { useTeamStore } from '../../../../../store/slices/useTeamStore'
import { useCustomErrorStore } from '../../../../../store/slices/useCustomErrorStore'

const AddedTeamDetails = ({ handleConfirmTeam }) => {
  const { deletePlayer, team } = useTeamStore()
  const { customError } = useCustomErrorStore()

  const handleDeletePlayer = (playerIndex) => {
    deletePlayer(playerIndex)
  }

  return (
    <div className="team-set">
      <h4>Team details</h4>
      <div className="team-set-details">
        <h5>Name</h5>
        {team?.name ? <p>{team?.name}</p> : <p>Team name no set yet</p>}
        <h5>Players</h5>
        {team?.players?.length === 0
          ? <p>No players set yet</p>
          : team?.players?.map((player, index) => (
            <div className="player-added-box" key={index}>
              <span style={{ fontWeight: 'bold' }}>{index + 1}</span>{player.name}
              <div className="delete-icon" onClick={() => handleDeletePlayer(index)}>
                <MdDeleteForever />
              </div>
            </div>
          ))}
      </div>
      <div className="confirm-team-box">
        <Button onClick={() => handleConfirmTeam()}>Confirm team</Button>
        <p className="form-message error-message">{customError || ''}</p>
      </div>
    </div>
  )
}

export default AddedTeamDetails