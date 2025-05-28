import { useEffect, useState } from 'react'
import BracketMatchesList from '../bracket-matches-list/BracketMatchesList'
import handleSubmitFormAdmin from '../../../../handleSubmitFormAdmin'
import { useTournamentsDetails } from '../../../../../../../store/slices/useTournamentsDetails'
import { useMessageStore } from '../../../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../../../store/slices/useSubmittingFormStore'
import formatBracketData from '../main/formatBracketData'
import transformMatches from '../main/transformMatches'
import SetKnockoutMatchResultModal from '../modals/SetKnockoutMatchResultModal'
import validateMatchResult from '../add-matches/errors/checkResultIsValid'

const BracketsMatchesResultSetter = () => {
  const [selectedStage, setSelectedStage] = useState(null)
  const [localTeam, setLocalTeam] = useState(null)
  const [visitorTeam, setVisitorTeam] = useState(null)
  const [customError, setCustomError] = useState(null)
  const [match, setMatch] = useState(null)
  const { currentTournament } = useTournamentsDetails()
  const { addMessage } = useMessageStore()
  const [dbKnockoutStages, setDbKnockoutStages] = useState([])
  const { setSubmittingForm } = useSubmittingFormStore()
  const [rounds, setRounds] = useState([])
  const [dbMatches, setDbMatches] = useState([])
  const [loading, setloading] = useState(false)
  const [showSetKnockoutMatchResultModal, setShowSetKnockoutMatchResultModal] = useState(false)
  const [matchResult, setMatchResult] = useState({
    localTeamScore: null,
    visitorTeamScore: null,
    localTeamPenaltyScore: null,
    visitorTeamPenaltyScore: null
  })

  const fetchData = async() => {
    setloading(true)
    await getKnockoutStages()
    await getMatches()
    setloading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setCustomError(null)
  }, [matchResult])

  useEffect(() => {
    const updatedFormattedMatches = transformMatches(dbMatches)
    const updatedRounds = formatBracketData(dbKnockoutStages, updatedFormattedMatches)

    setRounds(updatedRounds)
  }, [dbMatches, dbKnockoutStages])

  const handleSetKnockoutMatchResult = async() => {
    const result = validateMatchResult(matchResult, 'knockout')

    if (!result.isValid) {
      setCustomError(result.error)
      return
    }

    const values = {
      matchId: match?.matchId,
      stageId: selectedStage,
      localTeamId: localTeam?.teamId,
      visitorTeamId: visitorTeam?.teamId,
      localTeamScore: matchResult?.localTeamScore,
      visitorTeamScore: matchResult?.visitorTeamScore,
      localTeamPenaltyScore: matchResult?.localTeamPenaltyScore,
      visitorTeamPenaltyScore: matchResult?.visitorTeamPenaltyScore
    }

    const url = '/admin/fixture/matches/edit-knockout-match-result'
    const successResponse = 'Match score has been updated'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })

    if (response?.success) {
      setShowSetKnockoutMatchResultModal(false)
      getKnockoutStages()
      fetchData()
    }
  }

  const getKnockoutStages = async() => {
    try {
      const url = '/admin/fixture/stages/get-all-knockout-stages-by-tournament'
      const httpMethod = 'post'
      const values = { tournamentId: currentTournament.tournamentId }
      const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
      if (response?.success) {
        setDbKnockoutStages(response.data.dbKnockoutStages)
      }
    } catch (error) {}
  }

  const getMatches = async(values) => {
    try {
      const url = '/admin/fixture/matches/get-all'
      const httpMethod = 'post'
      const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
      if (response?.success) {
        setDbMatches(response.data.dbMatches)
      }
    } catch (error) {}
  }

  const onSetTeams = (matchData, type) => {
    const isValid = value => value !== null && value !== undefined && value !== ''
    if (!matchData.match) return

    const m = matchData.match
    setMatch(m)

    setMatchResult({
      localTeamScore: isValid(m.localTeamScore) ? m.localTeamScore : null,
      visitorTeamScore: isValid(m.visitorTeamScore) ? m.visitorTeamScore : null,
      localTeamPenaltyScore: isValid(m.localTeamPenaltyScore) ? m.localTeamPenaltyScore : null,
      visitorTeamPenaltyScore: isValid(m.visitorTeamPenaltyScore) ? m.visitorTeamPenaltyScore : null
    })

    setLocalTeam(m.localTeam || null)
    setVisitorTeam(m.visitorTeam || null)
    setSelectedStage(m?.stage?.stageId || null)
    setCustomError(null)

    setShowSetKnockoutMatchResultModal(true)
  }

  return (
    <div className="brackets-component bg-dark">
      <div className="knockout-matches-list-edit">
        <div className="matches-main">
          {loading
            ? (
              <div>
                <p>Loading data, please wait...</p>
              </div>
            )
            : (
              rounds.length === 0
                ? (<div>
                  <p>No knockout matches founded</p>
                </div>
                )
                : (
                  <div className="knockout-matches-list-edit">
                    <div>
                      <h4 style={{ margin: '0 0 20px 0' }}>
                    Knockout stages
                      </h4>
                      <p>Please select a match to set the result</p>
                    </div>
                    <BracketMatchesList
                      rounds={rounds}
                      onSetTeams={onSetTeams}
                      isGoalSeter={true}
                    />
                  </div>
                )
            )}
        </div>
      </div>
      <SetKnockoutMatchResultModal
        match={match}
        showSetKnockoutMatchResultModal={showSetKnockoutMatchResultModal}
        setShowSetKnockoutMatchResultModal={setShowSetKnockoutMatchResultModal}
        setMatchResult={setMatchResult}
        matchResult={matchResult}
        handleSetKnockoutMatchResult={handleSetKnockoutMatchResult}
        customError={customError}
      />
    </div>
  )
}

export default BracketsMatchesResultSetter