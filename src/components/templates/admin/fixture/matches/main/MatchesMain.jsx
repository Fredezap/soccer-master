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
import TableScores from '../../../../home/TableScores'

const MatchesMain = ({ getStages }) => {
  const { addMessage } = useMessageStore()
  const [dbGroups, setDbGroups] = useState([])
  const [dbKnockoutStages, setDbKnockoutStages] = useState([])
  const { setSubmittingForm } = useSubmittingFormStore()
  const [dbMatches, setDbMatches] = useState([])
  const [dbTeams, setDbTeams] = useState([])
  const { currentTournament } = useTournamentsDetails()
  const [loading, setloading] = useState(false)

  const getGroups = async() => {
    const url = '/admin/fixture/groups/get-all-groups-by-tournament'
    const httpMethod = 'post'
    const values = { tournamentId: currentTournament.tournamentId }
    const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
    if (response?.success) {
      setDbGroups(response.data.dbGroups)
    }
  }
  // TODO: MOSTRAR RESULTADOS EN LAS BRACKETS. VER RESULTADOS Y MODIFICACIONES EN FASE GRUPOS
  const getKnockoutStages = async() => {
    const url = '/admin/fixture/stages/get-all-knockout-stages-by-tournament'
    const httpMethod = 'post'
    const values = { tournamentId: currentTournament.tournamentId }
    const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
    if (response?.success) {
      setDbKnockoutStages(response.data.dbKnockoutStages)
    }
  }

  const getMatches = async(values) => {
    const url = '/admin/fixture/matches/get-all'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
    if (response?.success) {
      setDbMatches(response.data.dbMatches)
    }
  }

  const navigate = useNavigate()

  const getTeams = async() => {
    setloading(true)
    const values = { tournamentId: currentTournament.tournamentId }
    const url = '/admin/teams/get-by-tournament'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })
    if (response?.success) {
      setDbTeams(response.data?.tournament?.Teams)
    }
    setloading(false)
  }

  useEffect(() => {
    getGroups()
    getKnockoutStages()
    getMatches()
    getTeams()
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
                  variant="outline-info"
                  style={{ color: 'skyblue' }}
                  onClick={() => navigate(ROUTES.ADMIN.TEAMS.MAIN)}
                >
              Add team
                </Button>
              </div>
            )
            : (
              <div>
                <BracketKnokoutMatches
                  getTeams={getTeams}
                  dbTeams={dbTeams}
                  dbMatches={dbMatches}
                  getMatches={getMatches}
                  getKnockoutStages={getKnockoutStages}
                  dbKnockoutStages={dbKnockoutStages}
                />
                <GroupsMatches
                  getStages={getStages}
                  dbGroups={dbGroups}
                  getGroups={getGroups}
                />
              </div>
            )
        )}
    </div>
  )
}

export default MatchesMain