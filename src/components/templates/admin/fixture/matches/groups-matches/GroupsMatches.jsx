import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
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
import ConfirmMatchModal from './modals/ConfirmMatchModal.jsx'
import SetGroupMatchScoreModal from './modals/SetGroupMatchScoreModal.jsx'
import handleSubmitFormAdmin from '../../../handleSubmitFormAdmin.js'
import { useMessageStore } from '../../../../../../store/slices/useMessageStore.js'
import { useSubmittingFormStore } from '../../../../../../store/slices/useSubmittingFormStore.js'
import getTournaments from '../../../../../common/getters/GetTournaments.jsx'
import TableScores from '../../../../home/table-scores/TableScores'

const GroupsMatches = ({ dbGroups, getGroups, getStages }) => {
  const { stages } = useStagesStore()
  const [showGroupMatchesDetail, setShowGroupMatchesDetail] = useState(false)
  const [selectedGroupStage, setSelectedGroupStage] = useState(false)
  const [showScoreTable, setShowScoreTable] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [localTeam, setLocalTeam] = useState(null)
  const [visitorTeam, setVisitorTeam] = useState(null)
  const [showSelectGroup, setShowSelectGroup] = useState(false)
  const [customError, setCustomError] = useState(null)
  const [locationAndDateformData, setLocationAndDateformData] = useState({ date: '', time: '', location: '' })
  const [showConfirmMatchModal, setShowConfirmMatchModal] = useState(false)
  const groupedMatches = groupMatchesByDate(selectedGroupStage?.Matches || [])
  const [showDeleteGroupMatchModal, setShowDeleteGroupMatchModal] = useState(false)
  const [showEditGroupMatchModal, setShowEditGroupMatchModal] = useState(false)
  const [showSetScoreGroupMatchModal, setShowSetScoreGroupMatchModal] = useState(false)
  const [match, setMatch] = useState(null)
  const [formAction, setFormAction] = useState(null)
  const { addMessage } = useMessageStore()
  const { setSubmittingForm } = useSubmittingFormStore()
  const { fetchTournamentDetails } = getTournaments()
  const [matchResult, setMatchResult] = useState({
    localTeamScore: null,
    visitorTeamScore: null,
    localTeamPenaltyScore: null,
    visitorTeamPenaltyScore: null
  })

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

  const handleShowSelectGroup = (action) => {
    setSelectedGroup(null)
    setLocalTeam(null)
    setVisitorTeam(null)
    setLocationAndDateformData({ date: '', time: '', location: '' })
    setFormAction(action)
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

  useEffect(() => {
    setCustomError(null)
  }, [matchResult])

  const handleConfirmGroupMatch = async() => {
    const checkErrors = handleAddMatchErrors({
      setCustomError,
      selectedGroup,
      localTeam,
      visitorTeam,
      locationAndDateformData,
      selectedGroupStage,
      formAction
    })

    if (checkErrors) return

    setShowConfirmMatchModal(true)
  }

  const handleConfirmScore = async() => {
    const localTeamResult = matchResult.localTeamScore
    const visitorTeamResult = matchResult.visitorTeamScore

    const currentResultsNotValid =
    (localTeamResult === null || localTeamResult === undefined || localTeamResult === '') !==
    (visitorTeamResult === null || visitorTeamResult === undefined || visitorTeamResult === '')

    if (currentResultsNotValid) {
      setCustomError('Missing data: Enter the scores for both teams.')
      return
    }

    const values = {
      localTeamScore: matchResult.localTeamScore,
      visitorTeamScore: matchResult.visitorTeamScore,
      matchId: match?.matchId || null,
      stageId: selectedGroup?.Stage?.stageId,
      groupId: selectedGroup?.groupId,
      localTeamId: localTeam?.teamId,
      visitorTeamId: visitorTeam?.teamId
    }

    const successResponse = 'Score has been set'
    const url = '/admin/fixture/matches/edit-group-match-score'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    setShowConfirmMatchModal(false)

    if (response?.success) {
      getGroups()
      getStages()
      await fetchTournamentDetails()
    }

    setCustomError(null)
    setShowSetScoreGroupMatchModal(false)
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

  const handleShowModal = (match, action) => {
    setCustomError(null)
    setMatch(match)
    if (action === 'delete') setShowDeleteGroupMatchModal(true)
    else {
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
      const groupId = foundedGroup?.groupId
      const group = dbGroups[showGroupMatchesDetail]?.groups?.find(
        (g) => g.groupId === parseInt(groupId)
      )

      setSelectedGroup(group || null)
      setShowSelectGroup(false)
      setLocalTeam(match?.LocalTeam || null)
      setVisitorTeam(match?.VisitorTeam || null)
      const date = formatDate(match?.date).dashDate
      setLocationAndDateformData({ date: date || null, time: match?.time || null, location: match?.location || null })
      setMatchResult({
        localTeamScore: match?.localTeamScore,
        visitorTeamScore: match?.visitorTeamScore,
        localTeamPenaltyScore: match?.localTeamPenaltyScore,
        visitorTeamPenaltyScore: match?.visitorTeamPenaltyScore
      })
    }
    if (action === 'edit') {
      setFormAction(action)
      setShowEditGroupMatchModal(true)
    }

    if (action === 'set-score') {
      setShowSetScoreGroupMatchModal(true)
    }
  }

  return (
    <div className="groups-matches-main">
      <h4>Group matches</h4>
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

                      selectedGroupStage && (
                        <div className="matches-details">
                          <Button
                            onClick={() => handleShowSelectGroup('create')}
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
                                    localTeam={localTeam}
                                    visitorTeam={visitorTeam}
                                  />
                                ))}
                          </div>
                          <MatchesByDate
                            stageGroups={stageGroups}
                            selectedGroupStage={selectedGroupStage}
                            groupedMatches={groupedMatches}
                            getStages={getStages}
                            handleShowModal={handleShowModal}
                            backgroundStyle={'bg-light'}
                          />
                        </div>
                      )

                    )}
                  </div>
                ))}
            </div>
            <h4>
              All groups table scores
            </h4>
            <div className="matches-info">
              <div className="main-button" onClick={() => setShowScoreTable(!showScoreTable)}>
                <h6>
                Scores
                </h6>
              </div>
              {showScoreTable && (
                <div className="matches-details">
                  <div className="group-matches-details">
                    <div className="date-details">
                      <TableScores backgroundStyle="bg-light" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
        : (
          <p style={{ textAlign: 'center' }}>Please add group stages before adding matches</p>
        )}
      {setShowConfirmMatchModal && (
        <ConfirmMatchModal
          selectedGroup={selectedGroup}
          getGroups={getGroups}
          localTeam={localTeam}
          visitorTeam={visitorTeam}
          showConfirmMatchModal={showConfirmMatchModal}
          setShowConfirmMatchModal={setShowConfirmMatchModal}
          setShowEditGroupMatchModal={setShowEditGroupMatchModal}
          customError={customError}
          setCustomError={setCustomError}
          locationAndDateformData={locationAndDateformData}
          getStages={getStages}
          formAction={formAction}
          match={match}
          matchResult={matchResult}
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
          match={match}
        />
      )}
      {showSetScoreGroupMatchModal && (
        <SetGroupMatchScoreModal
          showSetScoreGroupMatchModal={showSetScoreGroupMatchModal}
          setShowSetScoreGroupMatchModal={setShowSetScoreGroupMatchModal}
          matchResult={matchResult}
          setMatchResult={setMatchResult}
          customError={customError}
          handleConfirmScore={handleConfirmScore}
        />
      )}
      <hr></hr>
    </div>
  )
}

export default GroupsMatches