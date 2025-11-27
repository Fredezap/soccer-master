import { useEffect, useState } from 'react'
import getMatchGroup from '../getMatchGroup'
import handleSubmitFormAdmin from '../../../../handleSubmitFormAdmin'
import MatchesByDate from '../MatchesByDate'
import { useTournamentsDetails } from '../../../../../../../store/slices/useTournamentsDetails'
import handleGetData from '../../../../handleGetData'
import { useMessageStore } from '../../../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../../../store/slices/useSubmittingFormStore'
import { useStagesStore } from '../../../../../../../store/slices/useStagesStore'
import { useDbGroupsStore } from '../../../../../../../store/slices/useDbGroupsStore'
import getTournaments from '../../../../../../common/getters/GetTournaments'
import groupMatchesByDate from '../groupMatchesByDate'
import SetGroupMatchScoreModal from '../modals/SetGroupMatchScoreModal'
import validateMatchResult from '../../brackets-matches/add-matches/errors/checkResultIsValid'
import { useUserStore } from '../../../../../../../store/slices/useUserStore'

const GroupMatchesResultSetter = () => {
  const [customError, setCustomError] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [localTeam, setLocalTeam] = useState(null)
  const [visitorTeam, setVisitorTeam] = useState(null)
  const [showGroupMatchesDetail, setShowGroupMatchesDetail] = useState(false)
  const [selectedGroupStage, setSelectedGroupStage] = useState(false)
  const groupedMatches = groupMatchesByDate(selectedGroupStage?.Matches || [])
  const [loading, setLoading] = useState(false)
  const { stages, setStages } = useStagesStore()
  const { currentTournament } = useTournamentsDetails()
  const { addMessage } = useMessageStore()
  const { setSubmittingForm } = useSubmittingFormStore()
  const { dbGroups, setDbGroups } = useDbGroupsStore()
  const { fetchTournamentDetails } = getTournaments()
  const [match, setMatch] = useState(null)
  const [showSetScoreGroupMatchModal, setShowSetScoreGroupMatchModal] = useState(false)
  const { user } = useUserStore()
  const [matchResult, setMatchResult] = useState({
    localTeamScore: null,
    visitorTeamScore: null,
    localTeamPenaltyScore: null,
    visitorTeamPenaltyScore: null
  })

  const getStages = async() => {
    const paramValues = { tournamentId: currentTournament?.tournamentId }
    const url = '/admin/fixture/stages/get-all-by-tournament'
    const response = await handleGetData({ paramValues, url, addMessage, user })

    if (response.success) { setStages(response.data.dbStages) }
  }

  const getGroups = async() => {
    try {
      const url = '/admin/fixture/groups/get-all-groups-by-tournament'
      const httpMethod = 'post'
      const values = { tournamentId: currentTournament.tournamentId }
      const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage, user })
      if (response?.success) {
        setDbGroups(response.data.dbGroups)
      }
    } catch (error) {}
  }

  const fetchData = async() => {
    setLoading(true)
    await getGroups()
    await getStages()
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setCustomError(null)
  }, [matchResult])

  useEffect(() => {
    if (showGroupMatchesDetail && stages.length > 0) {
      const updatedStage = stages.find(
        (stage) => stage.stageId === showGroupMatchesDetail
      )
      if (updatedStage) {
        setSelectedGroupStage(updatedStage)
      }
    }
  }, [stages])

  const handleShowModal = (match, action) => {
    setCustomError(null)
    setMatch(match)
    const foundedGroup = getMatchGroup(match)
    const groupId = foundedGroup?.groupId
    const group = dbGroups[showGroupMatchesDetail]?.groups?.find(
      (g) => g.groupId === parseInt(groupId)
    )

    setSelectedGroup(group || null)
    setLocalTeam(match?.LocalTeam || null)
    setVisitorTeam(match?.VisitorTeam || null)
    setMatchResult({
      localTeamScore: match?.localTeamScore,
      visitorTeamScore: match?.visitorTeamScore
    })
    if (action === 'set-score') {
      setShowSetScoreGroupMatchModal(true)
    }
  }

  const resetGroupValues = () => {
    setShowGroupMatchesDetail(false)
    setSelectedGroupStage(false)
    setSelectedGroup(null)
  }

  const handleConfirmScore = async() => {
    const result = validateMatchResult(matchResult, 'groups')

    if (!result.isValid) {
      setCustomError(result.error)
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
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod, user })

    if (response?.success) {
      fetchData()
      await fetchTournamentDetails()
    }

    setCustomError(null)
    setShowSetScoreGroupMatchModal(false)
  }

  const handleShowGroupMatchesDetail = (stageGroups) => {
    if (showGroupMatchesDetail === stageGroups.stageId) {
      resetGroupValues()
      return
    }
    setShowGroupMatchesDetail(stageGroups.stageId)
    setSelectedGroupStage(stageGroups)
  }

  return (
    <div className="matches-main bg-dark">
      {loading
        ? (
          <div>
            <p>Loading data...</p>
          </div>
        )
        : (
          stages?.filter((stage) => stage.type === 'group')?.length > 0
            ? (
              <div className="group-component">
                <div>
                  <h4 style={{ margin: '0 0 20px 0' }}>
                    Group stages
                  </h4>
                  <p>Please select a group stage to set the results</p>
                </div>
                <div className="group-matches">
                  {stages
                    .filter((stage) => stage.type === 'group')
                    .map((stageGroups) => (
                      <div key={stageGroups.stageId} className="matches-info">
                        <h6 onClick={() => handleShowGroupMatchesDetail(stageGroups)}>
                          {stageGroups.name}
                        </h6>

                        {showGroupMatchesDetail === stageGroups.stageId && selectedGroupStage && (
                          <div className="matches-details">
                            <MatchesByDate
                              stageGroups={stageGroups}
                              selectedGroupStage={selectedGroupStage}
                              groupedMatches={groupedMatches}
                              getStages={getStages}
                              handleShowModal={handleShowModal}
                              backgroundStyle={'bg-dark'}
                              isGoalSeter={true}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )
            : (
              <div>
                <p>No group stages founded</p>
              </div>
            ))
      }
      {showSetScoreGroupMatchModal && (
        <SetGroupMatchScoreModal
          showSetScoreGroupMatchModal={showSetScoreGroupMatchModal}
          setShowSetScoreGroupMatchModal={setShowSetScoreGroupMatchModal}
          matchResult={matchResult}
          setMatchResult={setMatchResult}
          customError={customError}
          handleConfirmScore={handleConfirmScore}
          localTeam={localTeam}
          visitorTeam={visitorTeam}
        />
      )}
    </div>
  )
}

export default GroupMatchesResultSetter