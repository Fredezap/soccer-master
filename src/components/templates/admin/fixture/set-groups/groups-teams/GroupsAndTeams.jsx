import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteForever } from 'react-icons/md'
import DeleteOrEditGroupModal from '../modals/DeleteOrEditGroupModal'
import DeleteTeamFromGroupWarningModal from '../modals/DeleteTeamFromGroupWarningModal'

const GroupsAndTeams = ({ dbGroups, handleAddTeamToGroup, getData }) => {
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false)
  const [groupId, setGroupId] = useState(null)
  const [showDeleteTeamFromGroupModal, setShowDeleteTeamFromGroupModal] = useState(false)
  const [teamId, setTeamId] = useState(null)

  const handleShowModal = (groupId) => {
    setGroupId(groupId)
    setShowDeleteGroupModal(true)
  }

  const handleShowDeleteTeamFromGroupModal = ({ teamId, groupId }) => {
    setTeamId(teamId)
    setGroupId(groupId)
    setShowDeleteTeamFromGroupModal(true)
  }

  return (
    Object.values(dbGroups).length > 0 && (
      <div className="setting-groups">
        <h4>GROUPS</h4>
        <div className="group-teams">
          {Object.values(dbGroups).map((stageGroups, index) =>
            <div key={index} className="group-info">
              <p>{stageGroups.name}</p>
              <div className="group-box">
                {stageGroups.groups.map((group) => (
                  <div key={group.groupId} className="group">
                    <div onClick={() => handleShowModal(group.groupId)} className="group-title">
                      <h6>{group.name}</h6>
                    </div>
                    <div className="group-teams-box">
                      {group.Teams?.length === 0
                        ? (
                          <p>No teams set for this group yet</p>
                        )
                        : (
                          group.Teams.map((team, index) => (
                            <div className="teams-set" key={team.teamId}>
                              <span>{index + 1}</span>
                              <div className="team-name">
                                <p>{team.name}</p>
                                <div>
                                  <MdDeleteForever
                                    onClick={() => handleShowDeleteTeamFromGroupModal({
                                      teamId: team.teamId,
                                      groupId: group.groupId
                                    })}
                                    className="delete-icon"
                                  />
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                    </div>
                    <Button
                      onClick={() => handleAddTeamToGroup(group)}
                      variant="outline-warning"
                    >
                        Add teams
                    </Button>
                  </div>
                ))
                }
              </div>
            </div>
          )}
        </div>
        <DeleteOrEditGroupModal
          showDeleteGroupModal={showDeleteGroupModal}
          setShowDeleteGroupModal={setShowDeleteGroupModal}
          groupId={groupId}
          getData={getData}
        />
        <DeleteTeamFromGroupWarningModal
          showDeleteTeamFromGroupModal={showDeleteTeamFromGroupModal}
          setShowDeleteTeamFromGroupModal={setShowDeleteTeamFromGroupModal}
          groupId={groupId}
          teamId={teamId}
          getData={getData}
        />
      </div>
    )
  )
}

export default GroupsAndTeams