import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import SelectTeamsForm from './SelectTeamsForm'
import ChooseDateAndLocationForm from './ChooseDateAndLocationForm'
import CreateMatchModal from './modals/CreateMatchModal'
import { useStagesStore } from '../../../../../../store/slices/useStagesStore.js'
import groupMatchesByDate from './groupMatchesByDate.js'
import checkNoSameTeams from './checkNoSameTeams.js'
import handleAddMatchErrors from './handleAddMatchErrors.js'
import handleTeamChange from './handleTeamChenge.js'
import MatchesByDate from './MatchesByDate.jsx'

const GroupsMatches = ({ dbGroups, getGroups, getStages }) => {
  const { stages } = useStagesStore()
  const [showGroupMatchesDetail, setShowGroupMatchesDetail] = useState(false)
  const [selectedGroupStage, setSelectedGroupStage] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [localTeam, setLocalTeam] = useState(null)
  const [visitorTeam, setVisitorTeam] = useState(null)
  const [showSelectGroup, setShowSelectGroup] = useState(false)
  const [customError, setCustomError] = useState(null)
  const [locationAndDateformData, setLocationAndDateformData] = useState({ date: '', time: '', location: '' })
  const [showCreateMatchModal, setShowCreateMatchModal] = useState(false)
  const groupedMatches = groupMatchesByDate(selectedGroupStage?.Matches || [])

  const handleShowGroupMatchesDetail = (stageGroups) => {
    setShowSelectGroup(false)
    setSelectedGroup(null)
    setLocalTeam(null)
    setVisitorTeam(null)
    if (showGroupMatchesDetail === stageGroups.stageId) {
      setShowGroupMatchesDetail(false)
      setSelectedGroupStage(false)
      setSelectedGroup(null)
      return
    }
    setShowGroupMatchesDetail(stageGroups.stageId)
    setSelectedGroupStage(stageGroups)
  }

  const handleGroupChange = (event) => {
    const groupId = event.target.value
    const group = dbGroups[showGroupMatchesDetail]?.groups?.find(
      (g) => g.groupId === parseInt(groupId)
    )
    setSelectedGroup(group)
    setCustomError(null)
    setLocalTeam(null)
    setVisitorTeam(null)
  }

  const handleShowSelectGroup = () => {
    setSelectedGroup(null)
    setLocalTeam(null)
    setVisitorTeam(null)
    setShowSelectGroup(!showSelectGroup)
  }

  useEffect(() => {
    checkNoSameTeams({ localTeam, visitorTeam, setCustomError })
  }, [localTeam, visitorTeam])

  useEffect(() => {
    if (selectedGroupStage) {
      const updatedStage = stages.find(
        (stage) => stage.stageId === selectedGroupStage.stageId
      )
      setSelectedGroupStage(updatedStage)
    }
  }, [stages])

  const handleShowCreateMatchModal = () => {
    const checkErrors = handleAddMatchErrors({
      setCustomError,
      selectedGroup,
      localTeam,
      visitorTeam,
      locationAndDateformData,
      selectedGroupStage
    })
    if (checkErrors) return
    setShowCreateMatchModal(true)
  }

  const teamChange = ({ event, teamType }) => {
    handleTeamChange({
      event,
      teamType,
      setVisitorTeam,
      setLocalTeam,
      dbGroups,
      showGroupMatchesDetail,
      selectedGroup,
      setCustomError
    })
  }

  return (
    <div style={{ marginTop: '50px' }}>
      {stages?.filter((stage) => stage.type === 'group')?.length > 0
        ? (
          <div className="group-component">
            <h4>GROUPS</h4>
            <div className="group-matches">
              {stages
                .filter((stage) => stage.type === 'group')
                .map((stageGroups) => (
                  <div key={stageGroups.stageId} className="matches-info">
                    <h6
                      onClick={() => handleShowGroupMatchesDetail(stageGroups)}
                    >
                      {stageGroups.name}
                    </h6>
                    {showGroupMatchesDetail === stageGroups.stageId && (
                      <div className="group-box">
                        {selectedGroupStage && (
                          <div>
                            <MatchesByDate
                              stageGroups={stageGroups}
                              selectedGroupStage={selectedGroupStage}
                              groupedMatches={groupedMatches}
                              getStages={getStages}
                              getGroups={getGroups}
                            />
                            <Button
                              onClick={() => handleShowSelectGroup()}
                              variant="outline-warning"
                            >
                            Add match
                            </Button>
                            <div className="select-group-for-match">
                              {showSelectGroup &&
                              (dbGroups[showGroupMatchesDetail]?.groups
                                ?.length === 0
                                ? (
                                  <p>Please add groups before adding matches</p>
                                )
                                : (
                                  <div>
                                    <SelectTeamsForm
                                      selectedGroup={selectedGroup}
                                      dbGroups={dbGroups}
                                      showGroupMatchesDetail={
                                        showGroupMatchesDetail
                                      }
                                      handleGroupChange={handleGroupChange}
                                      teamChange={teamChange}
                                    />
                                    <ChooseDateAndLocationForm
                                      locationAndDateformData={
                                        locationAndDateformData
                                      }
                                      setLocationAndDateformData={
                                        setLocationAndDateformData
                                      }
                                      setCustomError={setCustomError}
                                    />
                                    <div className="confirm-button">
                                      <Button
                                        disabled={customError}
                                        onClick={() =>
                                          handleShowCreateMatchModal()
                                        }
                                        variant="outline-success"
                                      >
                                      Confirm
                                      </Button>
                                      {customError && (
                                        <p className="form-message error-message">
                                          {customError}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )
        : (
          <p>No group stages added yet</p>
        )}
      {showCreateMatchModal && (
        <CreateMatchModal
          selectedGroup={selectedGroup}
          getGroups={getGroups}
          localTeam={localTeam}
          visitorTeam={visitorTeam}
          showCreateMatchModal={showCreateMatchModal}
          setShowCreateMatchModal={setShowCreateMatchModal}
          handleAddMatchErrors={handleAddMatchErrors}
          customError={customError}
          setCustomError={setCustomError}
          locationAndDateformData={locationAndDateformData}
          getStages={getStages}
        />
      )}
    </div>
  )
}

export default GroupsMatches