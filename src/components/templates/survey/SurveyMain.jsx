import { useEffect, useRef, useState } from 'react'
import useHeroDetails from '../../common/hero/useHeroDetails'
import Vote from './Vote'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import Hero from '../../common/hero/Hero'
import handleSubmitFormAdmin from '../admin/handleSubmitFormAdmin'
import { useMessageStore } from '../../../store/slices/useMessageStore'
import { useCustomErrorStore } from '../../../store/slices/useCustomErrorStore'
import { useSubmittingFormStore } from '../../../store/slices/useSubmittingFormStore'
import postServiceForUser from '../../../services/postServiceForUser'
import GetTournamentPlayers from '../../common/getters/getTournamentPlayers'

export const SurveyMain = () => {
  const { survey } = useHeroDetails()
  const heroRef = useRef(null)
  const { currentTournament } = useTournamentsDetails()
  const [hasVoted, setHasVoted] = useState(false)
  const { messages } = useMessageStore()
  const tournamentId = currentTournament?.tournamentId || null
  const [error, setError] = useState('')
  const MVPSurvey = currentTournament?.MVPSurvey || null
  const showVoting = (MVPSurvey.votingIsAvaliable && !MVPSurvey.showMVP) || false

  const voteAlredyExistMessage =
  useEffect(() => {
    if (heroRef.current) {
      const heroHeight = heroRef.current.offsetHeight
      window.scrollTo({ top: heroHeight, behavior: 'smooth' })
    }
  }, [currentTournament])

  const players = GetTournamentPlayers(currentTournament)

  const { setSubmittingForm } = useSubmittingFormStore()
  const { addMessage } = useMessageStore()
  const { user } = useCustomErrorStore()

  const fetchSurveyVotes = async() => {
    const url = '/survey/get-votes'
    const httpMethod = 'post'
    const values = { tournamentId }
    try {
      await handleSubmitFormAdmin({ url, addMessage, setSubmittingForm, httpMethod, user })
    } catch (error) {}
  }

  const createSurveyVote = async(selectedPlayer) => {
    const url = '/survey/create'
    const values = { playerId: selectedPlayer.playerId, tournamentId }

    try {
      const response = await postServiceForUser({ url, values, addMessage })
      if (!response?.success) {
        setHasVoted(true)
        const msg = response?.error?.[0]?.msg

        if (msg && msg.includes('Sie haben bereits abgestimmt')) {
          setError(msg)
        }
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchSurveyVotes()
  }, [])

  return (
    <div>
      <Hero title={survey.title} ref={heroRef} />

      <div className="centered bg-dark survey-voting-box">

        {showVoting
          ? (
            <>
              <h3>WER WAR FÜR DICH DIE BESTE SPIELERIN?</h3>

              {hasVoted
                ? (
                  <div className="thanks-box centered">
                    <p
                      style={{ color: 'red', margin: '10px 0 0 0' }}
                      className="thanks-title"
                    >
                Etwas ist schiefgelaufen!
                    </p>

                    {error
                      ? (
                        <p className="thanks-subtitle">{error}</p>
                      )
                      : (
                        <p className="thanks-subtitle">
                  Deine Stimme konnte leider nicht gespeichert werden. Bitte versuche es später erneut
                        </p>
                      )}
                  </div>
                )
                : (
                  <Vote
                    players={players}
                    createSurveyVote={createSurveyVote}
                  />
                )}
            </>
          )
          : (
            <p className="thanks-subtitle">
          Die Abstimmung ist im Moment nicht verfügbar.
            </p>
          )}

      </div>
    </div>
  )
}