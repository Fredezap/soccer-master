import { useEffect, useState } from 'react'
import { useTournamentsDetails } from '../../../../store/slices/useTournamentsDetails.js'
import handleSubmitFormAdmin from '../handleSubmitFormAdmin.js'
import { useSubmittingFormStore } from '../../../../store/slices/useSubmittingFormStore.js'
import { useMessageStore } from '../../../../store/slices/useMessageStore.js'
import { useCustomErrorStore } from '../../../../store/slices/useCustomErrorStore.js'
import useHeroDetails from '../../../common/hero/useHeroDetails.js'
import Hero from '../../../common/hero/Hero.jsx'
import GetTournamentPlayers from '../../../common/getters/getTournamentPlayers.js'
import getTournaments from '../../../common/getters/GetTournaments.jsx'

const SurveyAdminMain = () => {
  const { currentTournament } = useTournamentsDetails()
  const { setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()
  const { user } = useCustomErrorStore()
  const { adminSurvey } = useHeroDetails()
  const { fetchTournamentDetails } = getTournaments()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showMVPModal, setShowMVPModal] = useState(false)

  const tournamentId = currentTournament?.tournamentId
  const survey = currentTournament?.MVPSurvey || null

  const [loading, setLoading] = useState(false)
  const [votes, setVotes] = useState([])
  const [players, setPlayers] = useState([])
  const [modal, setModal] = useState({ show: false, type: null })

  // ---------------------- ------------------------------------
  // Fetch votes + players
  // ----------------------------------------------------------

  const loadVotes = async() => {
    const res = await handleSubmitFormAdmin({
      values: { tournamentId },
      url: '/survey/get-votes',
      httpMethod: 'post',
      addMessage,
      setSubmittingForm,
      user
    })

    if (res?.success) {
      setVotes(res.data.votes)
    }
  }
  useEffect(() => {
    if (!tournamentId) return

    loadVotes()
    setPlayers(GetTournamentPlayers(currentTournament))
  }, [])

  // ----------------------------------------------------------
  // Compute winner + detect tie
  // ----------------------------------------------------------
  const sortedVotes = [...votes].sort((a, b) => b.totalVotes - a.totalVotes)

  const winner = sortedVotes[0]

  const isTie =
    sortedVotes.length > 1 &&
    sortedVotes[0].totalVotes === sortedVotes[1].totalVotes

  const winnerForAssignment = isTie ? sortedVotes[0] : winner

  const tieMessage = isTie
    ? `There is a tie. The winner will be: ${winnerForAssignment.Player.name} (${winnerForAssignment.Player.Team.name}).`
    : null

  // ----------------------------------------------------------
  // Update backend
  // ----------------------------------------------------------
  const updateSurvey = async(changes) => {
    if (!tournamentId) return

    setLoading(true)

    try {
      const successResponse = changes.votingIsAvaliable
        ? 'Voting has started and is now visible to users.'
        : 'Voting has finished and is now NOT visible to users.'
      const MVPSurvey = {
        mvpSurveyId: 2,
        tournamentId: 2,
        ...changes
      }
      await handleSubmitFormAdmin({
        successResponse,
        url: '/survey/update-survey-availability',
        httpMethod: 'patch',
        values: { MVPSurvey },
        addMessage,
        setSubmittingForm,
        user
      })

      await fetchTournamentDetails(currentTournament)
    } catch (err) {}

    setLoading(false)
  }

  // ----------------------------------------------------------
  // DELETE VOTES
  // ----------------------------------------------------------
  const deleteVotes = async() => {
    if (!tournamentId) return

    setLoading(true)

    try {
      const url = '/survey/delete-all-survey-votes'
      const httpMethod = 'patch'

      const successResponse = 'All votes has been deleted'

      const response = await handleSubmitFormAdmin({
        url,
        values: { tournamentId },
        addMessage,
        successResponse,
        setSubmittingForm,
        httpMethod,
        user
      })

      if (response?.success) {
        setShowDeleteModal(false)
        await loadVotes()
        await fetchTournamentDetails(currentTournament)
      }
    } catch (error) {}

    setLoading(false)
  }

  // ----------------------------------------------------------
  // UPDATE MVP VISIBILITY
  // ----------------------------------------------------------
  const updateMVPVisibility = async(changes) => {
    if (!tournamentId) return

    setLoading(true)

    try {
      const url = '/survey/update-mvp-survey'
      const httpMethod = 'patch'

      const successResponse = changes.showMVP
        ? 'MVP is now visible to users.'
        : 'MVP is no longer visible to users.'

      const response = await handleSubmitFormAdmin({
        url,
        values: { MVPSurvey: { ...survey, ...changes } },
        addMessage,
        successResponse,
        setSubmittingForm,
        httpMethod,
        user
      })

      if (response?.success) {
        await fetchTournamentDetails(currentTournament)
      }
    } catch (error) {}

    setLoading(false)
  }

  // ----------------------------------------------------------
  // MODAL TEXTS
  // ----------------------------------------------------------
  const modalTexts = {
    enable_no_players: {
      title: 'No players',
      body: 'There are no players assigned. Voting cannot be enabled.',
      confirm: null
    },
    enable_has_winner: {
      title: 'Winner already exists',
      body: 'A winner is already assigned. Enabling voting will keep all existing votes.',
      confirm: 'Start voting anyway'
    },
    enable_confirm: {
      title: 'Start voting',
      body: 'Do you want to enable voting?',
      confirm: 'Start'
    },

    disable_no_votes: {
      title: 'No votes',
      body: 'No votes have been cast. Voting will be finished with no winner.',
      confirm: 'Disable'
    },

    disable_confirm: {
      title: 'Finish voting',
      body: isTie
        ? `Are you sure you want to finish voting?\n\n${tieMessage}`
        : 'Are you sure you want to finish voting and assign the winner?',
      confirm: 'Finish'
    }
  }

  const hasWinner = !!survey?.playerId
  const isShowing = survey?.showMVP

  let modalTitle = ''
  let modalText = ''
  let okDisabled = false

  if (!hasWinner) {
    modalTitle = 'Action not possible'
    modalText = 'You cannot show the MVP because no winner has been set yet. Finish a voting to set a winner'
    okDisabled = true
  } else if (!isShowing) {
    modalTitle = 'Show MVP?'
    modalText = 'Do you want to show the MVP to the users?'
  } else {
    modalTitle = 'Stop showing MVP?'
    modalText = 'Do you want to stop showing the MVP to the users?'
  }

  // ----------------------------------------------------------
  // MAIN BUTTON HANDLER
  // ----------------------------------------------------------
  const handleVoting = () => {
    const votingEnabled = survey?.votingIsAvaliable

    if (!votingEnabled) {
      if (players.length === 0) {
        setModal({ show: true, type: 'enable_no_players' })
        return
      }

      if (survey?.playerId) {
        setModal({ show: true, type: 'enable_has_winner' })
        return
      }

      setModal({ show: true, type: 'enable_confirm' })
      return
    }

    if (votes.length === 0) {
      setModal({ show: true, type: 'disable_no_votes' })
      return
    }

    // ✅ even if tie
    setModal({ show: true, type: 'disable_confirm' })
  }

  const handleShowMVP = () => {
    setShowMVPModal(true)
  }

  // ----------------------------------------------------------
  // CONFIRM ACTIONS
  // ----------------------------------------------------------
  const confirmEnable = () => {
    updateSurvey({ votingIsAvaliable: true, showMVP: false })
    setModal({ show: false, type: null })
  }

  const confirmDisable = () => {
    updateSurvey({
      votingIsAvaliable: false,
      playerId: winnerForAssignment?.playerId || null
    })

    setModal({ show: false, type: null })
  }

  const confirmMVPVisibility = () => {
    updateMVPVisibility({ showMVP: !survey.showMVP, votingIsAvaliable: false })
    setShowMVPModal(false)
  }

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------
  return (
    <div>
      <Hero title={adminSurvey.title} />

      <div className="container site-section">

        <div>
          <h2>MVP SURVEY ADMINISTRATION</h2>

          <div className="box bg-light p-3 rounded mb-4 shadow">
            <p>
              <strong>Voting enabled:</strong>{' '}
              <span className={survey?.votingIsAvaliable ? 'text-success' : 'text-danger'}>
                {survey?.votingIsAvaliable ? 'Yes' : 'No'}
              </span>
            </p>

            <p>
              <strong>Winner assigned:</strong>{' '}
              <span className={survey?.playerId ? 'text-success' : 'text-danger'}>
                {survey?.playerId ? 'Yes' : 'No'}
              </span>
            </p>

            <p>
              <strong>Showing Winner:</strong>{' '}
              <span className={survey?.showMVP ? 'text-success' : 'text-danger'}>
                {survey?.showMVP ? 'Yes' : 'No'}
              </span>
            </p>
          </div>

          <div className="centered survey-buttons">
            <button
              className="btn btn-primary"
              onClick={handleVoting}
              disabled={loading}
            >
              {survey?.votingIsAvaliable ? 'Finish voting' : 'Start voting'}
            </button>

            <button
              className="btn btn-primary"
              onClick={handleShowMVP}
              disabled={loading}
            >
              {survey?.showMVP ? 'Stop showing MVP to users' : 'Show MVP to users'}
            </button>

            <button
              style={{ backgroundColor: 'red', borderColor: 'red' }}
              className="btn btn-primary"
              onClick={() => setShowDeleteModal(true)}
              disabled={loading}
            >
              Delete all votes
            </button>

          </div>
        </div>

        {/* TABLE */}
        <div className="px-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Player</th>
                <th>Votes</th>
              </tr>
            </thead>

            <tbody>
              {sortedVotes.length > 0
                ? (
                  sortedVotes.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.Player.name} ({item.Player.Team.name})</td>
                      <td>{item.totalVotes}</td>
                    </tr>
                  ))
                )
                : (
                  <tr>
                    <td colSpan="3">No votes received yet</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {modal.show && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <div className="modal-dialog">
            <div className="modal-content" style={{ backgroundColor: 'rgba(49, 49, 48, 1)' }}>

              <div className="modal-header">
                <h5 className="modal-title">{modalTexts[modal.type].title}</h5>

                <button
                  className="btn-close"
                  onClick={() => setModal({ show: false, type: null })}
                />
              </div>

              <div className="modal-body">
                <p>{modalTexts[modal.type].body}</p>
              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() => setModal({ show: false, type: null })}
                >
                  Cancel
                </button>

                {modalTexts[modal.type].confirm && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (modal.type.includes('enable')) confirmEnable()
                      if (modal.type.includes('disable')) confirmDisable()
                    }}
                  >
                    {modalTexts[modal.type].confirm}
                  </button>

                )}

              </div>

            </div>
          </div>
        </div>
      )}

      {/* MVP MODAL */}
      {showMVPModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.2)' }}>

          <div className="modal-dialog">
            <div className="modal-content" style={{ backgroundColor: 'rgba(49, 49, 48, 1)' }}>

              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowMVPModal(false)}
                />
              </div>

              <div className="modal-body">
                <p>{modalText}</p>
              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowMVPModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={confirmMVPVisibility}
                  disabled={okDisabled}
                >
                  Confirm
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.2)' }}>

          <div className="modal-dialog">
            <div className="modal-content" style={{ backgroundColor: 'rgba(49, 49, 48, 1)' }}>

              <div className="modal-header">
                <h5 className="modal-title">Delete votes</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                />
              </div>

              <div className="modal-body">
                <p>{sortedVotes.length === 0 ? 'No votes to delete' : 'Are you sure you want to delete all votes?'}</p>
              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => deleteVotes()}
                  disabled={sortedVotes.length === 0}
                >
                  Confirm
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SurveyAdminMain