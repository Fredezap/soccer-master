import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import CreateMatchModal from './modals/CreateMatchModal'
import { useStagesStore } from '../../../../../../store/slices/useStagesStore.js'
import groupMatchesByDate from './groupMatchesByDate.js'
import checkNoSameTeams from './checkNoSameTeams.js'
import handleAddMatchErrors from './handleAddMatchErrors.js'
import handleTeamChange from './handleTeamChenge.js'
import MatchesByDate from './MatchesByDate.jsx'
import AddGroupMatchesForm from './AddGroupMatchesForm.jsx'
import DeleteGroupMatchModal from './modals/DeleteGroupMatchModal.jsx'
import EditGroupMatchModal from './modals/EditGroupMatchModal.jsx'
import formatDate from '../../../../../common/formatDate.js'

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
  const [showDeleteGroupMatchModal, setShowDeleteGroupMatchModal] = useState(false)
  const [showEditGroupMatchModal, setShowEditGroupMatchModal] = useState(false)
  const [match, setMatch] = useState(null)
  const [formAction, setFormAction] = useState(null)

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
    setLocationAndDateformData({ date: '', time: '', location: '' })
    setFormAction('create')
    setShowSelectGroup(!showSelectGroup)
  }

  useEffect(() => {
    checkNoSameTeams({ localTeam, visitorTeam, setCustomError })
  }, [localTeam, visitorTeam, locationAndDateformData.date, locationAndDateformData.time, locationAndDateformData.location])

  useEffect(() => {
    if (selectedGroupStage) {
      const updatedStage = stages.find(
        (stage) => stage.stageId === selectedGroupStage.stageId
      )
      setSelectedGroupStage(updatedStage)
    }
  }, [stages])

  const handleConfirmGroupMatch = async(action) => {
    console.log(action)
    const checkErrors = handleAddMatchErrors({
      setCustomError,
      selectedGroup,
      localTeam,
      visitorTeam,
      locationAndDateformData,
      selectedGroupStage
    })

    if (checkErrors) return

    if (action === 'edit') {
      console.log('LLEGO A EDIT')

      // if (!matchId) {
      //   setCustomError('Match not found')
      //   return
      // }

      // const values = { matchId }
      // const successResponse = 'Team has been deleted'
      // const url = '/admin/fixture/matches/delete'
      // const httpMethod = 'post'
      // const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
      // if (response.success) {
      //   setShowEditGroupMatchModal(false)
      //   getStages()
      // }
    }
    if (action === 'create') console.log('LLEGO A CREATE')
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
  // todo: mejorar visual formulario edicion. Ver de hacer lo mismo que con el de knockout
  // todo: Cheuquear la edicion, creacion y eliminacion de partidos de fase de grupos
  // todo: probar tambien si no hay conflicto con los de knockout
  // todo: ver que ningun dato se cruce con otro torneo
  const handleShowModal = (match, action) => {
    setCustomError(null)
    console.log(match)
    setMatch(match)
    if (action === 'delete') setShowDeleteGroupMatchModal(true)
    if (action === 'edit') {
      const getMatchGroup = (match) => {
        if (!match || !match.LocalTeam || !match.VisitorTeam) return null

        const localGroups = match.LocalTeam.Groups || []
        const visitorGroups = match.VisitorTeam.Groups || []

        // Filtrar grupos que coincidan con el stageId del partido
        const stageId = match.stageId

        const localStageGroups = localGroups.filter(group => group.stageId === stageId)
        const visitorStageGroups = visitorGroups.filter(group => group.stageId === stageId)

        // Encontrar un grupo común entre LocalTeam y VisitorTeam
        const commonGroup = localStageGroups.find(localGroup =>
          visitorStageGroups.some(visitorGroup => visitorGroup.groupId === localGroup.groupId)
        )

        return commonGroup || null // Devuelve el grupo común o null si no existe
      }
      const foundedGroup = getMatchGroup(match)
      const groupId = foundedGroup.groupId
      const group = dbGroups[showGroupMatchesDetail]?.groups?.find(
        (g) => g.groupId === parseInt(groupId)
      )
      console.log(group)
      setSelectedGroup(group || null)

      const handleGroupChange = (event) => {

      }

      setShowSelectGroup(false)
      setLocalTeam(match?.LocalTeam || null)
      setVisitorTeam(match?.VisitorTeam || null)
      const date = formatDate(match?.date).dashDate
      setLocationAndDateformData({ date: date || null, time: match?.time || null, location: match?.location || null })
      setFormAction(action)
      setShowEditGroupMatchModal(true)
    }
  }

  return (
    <div style={{ marginTop: '50px' }}>
      <h4 style={{ textAlign: 'center' }}>GROUPS</h4>
      {stages?.filter((stage) => stage.type === 'group')?.length > 0
        ? (
          <div className="group-component">
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
                              handleShowModal={handleShowModal}
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
                                  <AddGroupMatchesForm
                                    selectedGroup={selectedGroup}
                                    dbGroups={dbGroups}
                                    showGroupMatchesDetail={showGroupMatchesDetail}
                                    handleGroupChange={handleGroupChange}
                                    teamChange={teamChange}
                                    locationAndDateformData={locationAndDateformData}
                                    setLocationAndDateformData={setLocationAndDateformData}
                                    setCustomError={setCustomError}
                                    customError={customError}
                                    handleConfirmGroupMatch={handleConfirmGroupMatch}
                                    formAction={formAction}
                                  />
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
          <p style={{ textAlign: 'center' }}>Please add group stages before adding matches</p>
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
      {showDeleteGroupMatchModal && (
        <DeleteGroupMatchModal
          showDeleteGroupMatchModal={showDeleteGroupMatchModal}
          setShowDeleteGroupMatchModal={setShowDeleteGroupMatchModal}
          match={match}
          getStages={getStages}
        />
      )}
      {showEditGroupMatchModal && (
        <EditGroupMatchModal
          showEditGroupMatchModal={showEditGroupMatchModal}
          setShowEditGroupMatchModal={setShowEditGroupMatchModal}
          selectedGroup={selectedGroup}
          dbGroups={dbGroups}
          showGroupMatchesDetail={showGroupMatchesDetail}
          handleGroupChange={handleGroupChange}
          teamChange={teamChange}
          locationAndDateformData={locationAndDateformData}
          setLocationAndDateformData={setLocationAndDateformData}
          setCustomError={setCustomError}
          customError={customError}
          handleConfirmGroupMatch={handleConfirmGroupMatch}
          formAction={formAction}
          localTeam={localTeam}
          visitorTeam={visitorTeam}
        />
      )}
    </div>
  )
}

export default GroupsMatches