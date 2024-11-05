import { Button } from 'react-bootstrap'
import ROUTES from '../../../../../store/constants/routes'
import { useNavigate } from 'react-router-dom'
import { useTeamStore } from '../../../../../store/slices/useTeamStore'
import { MdDeleteForever } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'

const TeamPlayers = ({ dbTeam, deleteTeam }) => {
  const navigate = useNavigate()
  const { setTeam } = useTeamStore()

  const handleEditTeam = () => {
    setTeam({
      teamId: dbTeam.teamId,
      name: dbTeam.name,
      players: dbTeam.Players
    })
    navigate(ROUTES.ADMIN.TEAMS.UPDATE)
  }

  return (
    <>
      {dbTeam.Players?.length === 0
        ? (
          <tr className="team-player-row">
            <td colSpan="2">No players added yet</td>
          </tr>
        )
        : (
          dbTeam?.Players?.map((player, index) => (
            <tr key={player.playerId} className="team-player-row">
              <td colSpan="2"><strong>{index + 1}</strong> {player.name}</td>
            </tr>
          ))
        )}
      <tr className="team-buttons-container">
        <td>
          <div className="buttons-box">
            <div className="delete-icon-team" onClick={() => deleteTeam({ teamId: dbTeam.teamId })}>
              <MdDeleteForever />
            </div>
            <div className="edit-icon-team" onClick={() => handleEditTeam(dbTeam)}>
              <CiEdit />
            </div>
          </div>
        </td>
      </tr>
    </>
  )
}

export default TeamPlayers