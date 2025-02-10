import { Modal, Button } from 'react-bootstrap'
import { useMessageStore } from '../../../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../../../store/slices/useSubmittingFormStore'
import { useEffect, useState } from 'react'
import TeamsAreKnownForm from '../add-matches/teams-are-known-form/TeamsAreKnownForm'
import ChooseDateAndLocationForm from '../add-matches/common-forms/ChooseDateAndLocationForm'
import SetMatchResult from '../add-matches/common-forms/SetMatchResult'
import useKnockoutMatchErrorManager from '../add-matches/errors/useKnockoutMatchErrorManager'
import formatDate from '../../../../../../common/formatDate'
import handleSubmitFormAdmin from '../../../../handleSubmitFormAdmin'

const EditKnockoutMatchModal = ({
  match,
  dbTeams,
  showModalEdit,
  setShowModalEdit,
  getMatches,
  rounds,
  getKnockoutStages
}) => {
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const [customError, setCustomError] = useState(null)
  const [localTeamPlaceholder, setLocalTeamPlaceholder] = useState(null)
  const [selectedStage, setSelectedStage] = useState(null)
  const [localTeam, setLocalTeam] = useState(null)
  const [visitorTeam, setVisitorTeam] = useState(null)
  const [locationAndDateformData, setLocationAndDateformData] = useState({ date: '', time: '', location: '' })
  const [visitorTeamPlaceholder, setVisitorTeamPlaceholder] = useState(null)
  const [matchResult, setMatchResult] = useState({
    localTeamScore: null,
    visitorTeamScore: null,
    localTeamPenaltyScore: null,
    visitorTeamPenaltyScore: null
  })
  const TEAM_STATUS = { UNDEFINED: 'undefined', KNOWN: 'known', UNKNOWN: 'unknown' }
  const [teamStatus, setTeamStatus] = useState(TEAM_STATUS.UNDEFINED)

  useEffect(() => {
    setCustomError(null)
  }, [localTeam, visitorTeam])

  useEffect(() => {
    setTeamStatus(match?.localTeam !== null && match.visitorTeam !== null ? TEAM_STATUS.KNOWN : TEAM_STATUS.UNKNOWN)
    setLocalTeam(match?.localTeam || null)
    setVisitorTeam(match?.visitorTeam || null)
    setLocationAndDateformData({ date: formatDate(match?.date).dashDate || '', time: match?.time || '', location: match?.location || '' })
    setMatchResult({
      localTeamScore: match?.localTeamScore,
      visitorTeamScore: match?.visitorTeamScore,
      localTeamPenaltyScore: match?.localTeamPenaltyScore,
      visitorTeamPenaltyScore: match?.visitorTeamPenaltyScore
    })
    setLocalTeamPlaceholder(match?.localTeamPlaceholder)
    setVisitorTeamPlaceholder(match?.visitorTeamPlaceholder)
    setSelectedStage(match?.stage?.stageId)
  }, [match])

  const handleEditMatch = async() => {
    const checkErrors = useKnockoutMatchErrorManager({
      TEAM_STATUS,
      teamStatus,
      selectedStage,
      visitorTeam,
      localTeam,
      locationAndDateformData,
      rounds,
      setCustomError,
      localTeamPlaceholder,
      visitorTeamPlaceholder,
      action: 'edit'
    })
    if (checkErrors) return
    setCustomError(null)

    const values = {
      matchId: match?.matchId,
      stageId: selectedStage,
      date: locationAndDateformData?.date,
      time: locationAndDateformData?.time,
      location: locationAndDateformData?.location,
      localTeamId: localTeam?.teamId,
      visitorTeamId: visitorTeam?.teamId,
      localTeamScore: matchResult?.localTeamScore,
      visitorTeamScore: matchResult?.visitorTeamScore,
      localTeamPenaltyScore: matchResult?.localTeamPenaltyScore,
      visitorTeamPenaltyScore: matchResult?.visitorTeamPenaltyScore
    }

    let url

    if (values.localTeamId === undefined && values.visitorTeamId === undefined) {
      url = '/admin/fixture/matches/edit-unknown-teams'
    } else {
      url = '/admin/fixture/matches/edit-known-teams'
    }

    const successResponse = 'Match has been updated'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response?.success) {
      setShowModalEdit(false)
      getKnockoutStages()
      getMatches()
    }
  }

  return (
    <Modal
      className="custom-modal"
      size="xl"
      show={showModalEdit}
      onHide={() => setShowModalEdit(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>Edit match</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-succes-body">
        <div className="modal-box">
          <h5>Choose the teams that will play this match</h5>
          {(localTeam !== null || visitorTeam !== null) && (
            <div className="team-vs-team">
              <p>{localTeam?.name ? localTeam.name : null}</p>
              <p style={{ fontWeight: 'bold' }}>VS</p>
              <p>{visitorTeam?.name ? visitorTeam.name : null}</p>
            </div>
          )}
          <TeamsAreKnownForm
            match={match}
            dbTeams={dbTeams}
            setLocalTeam={setLocalTeam}
            setVisitorTeam={setVisitorTeam}
          />
          <ChooseDateAndLocationForm
            locationAndDateformData={locationAndDateformData}
            setLocationAndDateformData={setLocationAndDateformData}
          />
          <SetMatchResult
            matchResult={matchResult}
            setMatchResult={setMatchResult}
          />
          {customError && (
            <p
              style={{ margin: '0', marginBottom: '-20px' }}
              className="form-message error-message same-team-match-error">{customError}
            </p>
          )}
          <Button
            disabled={submittingForm || customError}
            variant="outline-info"
            onClick={handleEditMatch}
          >
            Edit match
          </Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => setShowModalEdit(false)} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditKnockoutMatchModal