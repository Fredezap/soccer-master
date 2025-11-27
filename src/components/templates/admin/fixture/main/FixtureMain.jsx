import { useEffect, useState } from 'react'
import Hero from '../../../../common/hero/Hero'
import useHeroDetails from '../../../../common/hero/useHeroDetails'
import handleGetData from '../../handleGetData'
import { useMessageStore } from '../../../../../store/slices/useMessageStore'
import StagesMain from '../stages/main/StagesMain'
import { Button } from 'react-bootstrap'
import MatchesMain from '../matches/main/MatchesMain'
import SetGroupsMain from '../set-groups/SetGroupsMain'
import { useStagesStore } from '../../../../../store/slices/useStagesStore'
import { useTournamentsDetails } from '../../../../../store/slices/useTournamentsDetails'
import SideMenu from '../../side-menu/SideMenu'
import { useDbGroupsStore } from '../../../../../store/slices/useDbGroupsStore'
import handleSubmitFormAdmin from '../../handleSubmitFormAdmin'
import { useSubmittingFormStore } from '../../../../../store/slices/useSubmittingFormStore'
import { useUserStore } from '../../../../../store/slices/useUserStore'

const FixtureMain = () => {
  const { adminFixture } = useHeroDetails()
  const { stages, setStages } = useStagesStore()
  const [showStages, setShowStages] = useState(false)
  const [showMatches, setShowMatches] = useState(false)
  const [showGroups, setShowGroups] = useState(false)
  const { addMessage } = useMessageStore()
  const { currentTournament } = useTournamentsDetails()
  const { setDbGroups } = useDbGroupsStore()
  const { setSubmittingForm } = useSubmittingFormStore()
  const { user } = useUserStore()

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

  useEffect(() => {
    getStages()
  }, [])

  return (
    <div>
      <SideMenu />
      <Hero title={adminFixture.title} />
      <div className="bg-light admin-fixture">
        <div className="admin-settings-info">
          <h5 className="title">How does the website work?</h5>
          <p>As an admin, here’s how to set up the tournament step-by-step:</p>

          <h5>1. Define the Tournament Stages</h5>
          <p>Start by setting up the stages of the tournament, such as "Group Stage," "Quarterfinals," "Semifinals," and "Final."</p>

          <h5>2. Name the Groups</h5>
          <p>If the tournament includes group stages, create the group names (e.g., "Group A," "Group B") to organize teams accordingly.</p>

          <h5>3. Assign Teams to Groups</h5>
          <p>Next, choose the teams that will belong to each group, arranging them based on your tournament structure.</p>

          <h5>4. Schedule Matches</h5>
          <p>Finally, set up the matches by defining the date, time, and location for each. If you already know which teams will face each other, you can also specify the matchups at this stage.</p>

          <p>Following these steps will create a well-organized tournament structure, allowing for a clear schedule and easy team management.</p>
        </div>

        <div className="admin-fixture-buttons">
          <Button onClick={() => setShowStages(!showStages)} variant="outline-success">
            {showStages ? 'Hide stages' : 'Show stages'}
          </Button>
          {showStages && <StagesMain stages={stages} getStages={getStages} getGroups={getGroups}/>}
          <Button onClick={() => setShowGroups(!showGroups)} variant="outline-success">
            {showGroups ? 'Hide groups' : 'Show groups'}
          </Button>
          {showGroups && <SetGroupsMain />}
          <Button onClick={() => setShowMatches(!showMatches)} variant="outline-success">
            {showMatches ? 'Hide matches' : 'Show matches'}
          </Button>
          {showMatches && <MatchesMain getStages={getStages} />}
        </div>
      </div>
    </div>
  )
}

export default FixtureMain