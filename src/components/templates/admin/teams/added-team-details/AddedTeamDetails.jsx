import React from 'react'
import { Button } from 'react-bootstrap'
import { MdDeleteForever } from 'react-icons/md'
import { useTeamStore } from '../../../../../store/slices/useTeamStore'
import { useCustomErrorStore } from '../../../../../store/slices/useCustomErrorStore'

const BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_IMG_DEV_BASE_URL
  : import.meta.env.VITE_IMG_PROD_BASE_URL

const AddedTeamDetails = ({ handleConfirmTeam }) => {
  const { deletePlayer, team, setTeamLogo } = useTeamStore()
  const { customError } = useCustomErrorStore()

  const handleDeletePlayer = (playerIndex) => {
    deletePlayer(playerIndex)
  }

  const deleteImg = () => {
    setTeamLogo({ reader: null, url: null, file: null })
  }

  return (
    <div className="team-set">
      <h4>Team details</h4>
      <div className="team-set-details">
        <h5>Name</h5>
        {
          team?.name
            ? <p>        {team?.name}</p>
            : <p>Team name no set yet</p>
        }
        <h5>Players</h5>
        {team?.players?.length === 0
          ? <p>No players set yet</p>
          : team?.players?.map((player, index) => (
            <div className="player-added-box" key={index}>
              <span style={{ fontWeight: 'bold' }}>{index + 1}</span>{player.name}
              <div onClick={() => handleDeletePlayer(index)}>
                <MdDeleteForever className="delete-icon" />
              </div>
            </div>
          ))}
        <h5>Logo</h5>
        {team?.logo?.reader || team?.logo?.url
          ? (
            <div className="team-logo-form">
              <img src={team?.logo?.reader || `${BASE_URL}${team?.logo?.url?.trim()}?t=${Date.now()}`} alt="Image" />
              <MdDeleteForever onClick={deleteImg} className="delete-icon" />
            </div>
          )
          : (
            <p>No logo set yet</p>
          )}
      </div>
      <div className="confirm-team-box">
        <Button onClick={() => handleConfirmTeam()}>Confirm team</Button>
        <p className="form-message error-message">{customError || ''}</p>
      </div>
    </div>
  )
}

export default AddedTeamDetails