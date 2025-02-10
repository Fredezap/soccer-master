import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteForever } from 'react-icons/md'
import DeleteOrEditGroupModal from '../modals/DeleteOrEditGroupModal'
import DeleteTeamFromGroupWarningModal from '../modals/DeleteTeamFromGroupWarningModal'
import SetStagePointsModal from '../modals/SetStagePointsModal'
import { FaCheckCircle, FaEquals, FaTimesCircle } from 'react-icons/fa'

const GroupsAndTeams = ({ dbGroups, handleAddTeamToGroup, getData }) => {
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false)
  const [groupId, setGroupId] = useState(null)
  const [showDeleteTeamFromGroupModal, setShowDeleteTeamFromGroupModal] = useState(false)
  const [teamId, setTeamId] = useState(null)
  const [showSetStagePointsModal, setShowSetStagePointsModal] = useState(false)
  const [stageId, setStageId] = useState(null)

  const handleShowModal = (groupId) => {
    setGroupId(groupId)
    setShowDeleteGroupModal(true)
  }

  const handleShowDeleteTeamFromGroupModal = ({ teamId, groupId }) => {
    setTeamId(teamId)
    setGroupId(groupId)
    setShowDeleteTeamFromGroupModal(true)
  }

  const handleSetPointsPerMatch = (stageId) => {
    setStageId(stageId)
    setShowSetStagePointsModal(true)
  }

  return (
    Object.values(dbGroups).length > 0 && (
      <div className="setting-groups">
        <h4>GROUPS</h4>
        <div className="group-teams">
          {Object.values(dbGroups).map((stageGroups, index) =>
            <div key={index} className="group-info">
              <p>{stageGroups.Stage.name}</p>
              {stageGroups.Stage.drawnPoints === 0 && stageGroups.Stage.lostPoints === 0 && stageGroups.Stage.wonPoints === 0
                ? (
                  <div onClick={() => handleSetPointsPerMatch(stageGroups.Stage.stageId)}>
                    <h4 className="set-group-stage-points">Please set the points per match result before adding teams to the groups</h4>
                  </div>
                )
                : (
                  <div>
                    <div className="stage-points" onClick={() => handleSetPointsPerMatch(stageGroups.Stage.stageId)}>
                      <span>
                        <FaCheckCircle color="green" size={20} />
                        <span>Points for a win =</span>
                        {stageGroups.Stage.wonPoints}
                      </span>
                      <span>
                        <FaEquals color="gray" size={25} />
                        <span>Points for a draw =</span>
                        {stageGroups.Stage.drawnPoints}
                      </span>
                      <span>
                        <FaTimesCircle color="red" size={20} />
                        <span>Points for a loss =</span>
                        {stageGroups.Stage.lostPoints}
                      </span>
                    </div>
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
          )}
        </div>
        {showDeleteGroupModal &&
        <DeleteOrEditGroupModal
          showDeleteGroupModal={showDeleteGroupModal}
          setShowDeleteGroupModal={setShowDeleteGroupModal}
          groupId={groupId}
          getData={getData}
        />}
        {showDeleteTeamFromGroupModal &&
        <DeleteTeamFromGroupWarningModal
          showDeleteTeamFromGroupModal={showDeleteTeamFromGroupModal}
          setShowDeleteTeamFromGroupModal={setShowDeleteTeamFromGroupModal}
          groupId={groupId}
          teamId={teamId}
          getData={getData}
        />}
        {showSetStagePointsModal &&
        <SetStagePointsModal
          showSetStagePointsModal={showSetStagePointsModal}
          setShowSetStagePointsModal={setShowSetStagePointsModal}
          stageId={stageId}
          getData={getData}
        />}
      </div>
    )
  )
}

export default GroupsAndTeams