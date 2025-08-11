import { useEffect, useState } from 'react'
import BracketKnokoutMatches from '../brackets-matches/main/BracketKnokoutMatches'
import GroupsMatches from '../groups-matches/GroupsMatches'
import { useMessageStore } from '../../../../../../store/slices/useMessageStore'
import handleSubmitFormAdmin from '../../../handleSubmitFormAdmin'
import { useSubmittingFormStore } from '../../../../../../store/slices/useSubmittingFormStore'
import { useTournamentsDetails } from '../../../../../../store/slices/useTournamentsDetails'
import ROUTES from '../../../../../../store/constants/routes'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDbGroupsStore } from '../../../../../../store/slices/useDbGroupsStore'
import { useUserStore } from '../../../../../../store/slices/useUserStore'

const MatchesMain = ({ getStages }) => {
  const { addMessage } = useMessageStore()
  const [dbKnockoutStages, setDbKnockoutStages] = useState([])
  const { setSubmittingForm } = useSubmittingFormStore()
  const [dbMatches, setDbMatches] = useState([])
  const [dbTeams, setDbTeams] = useState([])
  const { currentTournament } = useTournamentsDetails()
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const { dbGroups, setDbGroups } = useDbGroupsStore()
  const { user } = useUserStore()

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

  const getKnockoutStages = async() => {
    try {
      const url = '/admin/fixture/stages/get-all-knockout-stages-by-tournament'
      const httpMethod = 'post'
      const values = { tournamentId: currentTournament.tournamentId }
      const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage, user })
      if (response?.success && response.data?.dbKnockoutStages) {
        setDbKnockoutStages(response.data.dbKnockoutStages)
      }
    } catch (error) {}
  }

  const getMatches = async(values) => {
    try {
      const url = '/admin/fixture/matches/get-all'
      const httpMethod = 'post'
      const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage, user })
      if (response?.success) {
        setDbMatches(response.data.dbMatches)
      }
    } catch (error) {}
  }

  const getTeams = async() => {
    try {
      setloading(true)
      const values = { tournamentId: currentTournament.tournamentId }
      const url = '/admin/teams/get-by-tournament'
      const httpMethod = 'post'
      const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage, user })
      if (response?.success) {
        setDbTeams(response.data?.tournament?.Teams)
      }
    } catch (error) {}
  }

  useEffect(() => {
    const fetchData = async() => {
      setloading(true)
      await getGroups()
      await getKnockoutStages()
      await getMatches()
      await getTeams()
      setloading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="matches-main bg-dark">
      {loading
        ? (
          <div>
            <p>Loading data...</p>
          </div>
        )
        : (
          !dbTeams || dbTeams.length === 0
            ? (
              <div className="no-teams-found">
                <p>No teams found</p>
                <p>Please add teams before adding a match</p>
                <Button
                  variant="outline-warning"
                  style={{ color: 'orange' }}
                  onClick={() => navigate(ROUTES.ADMIN.TEAMS.MAIN)}
                >
              Add team
                </Button>
              </div>
            )
            : (
              <div>
                <GroupsMatches
                  getStages={getStages}
                  dbGroups={dbGroups}
                  getGroups={getGroups}
                />
                <BracketKnokoutMatches
                  getTeams={getTeams}
                  dbTeams={dbTeams}
                  dbMatches={dbMatches}
                  getMatches={getMatches}
                  getKnockoutStages={getKnockoutStages}
                  dbKnockoutStages={dbKnockoutStages}
                />
              </div>
            )
        )}
    </div>
  )
}

export default MatchesMain