import { useState } from 'react'
import { Button } from 'react-bootstrap'
import AddKnockoutMatchesFormMain from './common-forms/AddKnockoutMatchesFormMain'

const AddKnockoutMatchMain = ({
  rounds,
  dbKnockoutStages,
  dbTeams,
  getKnockoutStages,
  getMatches
}) => {
  const [showAddMatchForm, setShowAddMatchForm] = useState(false)
  const handleShowAddMatchForm = () => {
    setShowAddMatchForm(!showAddMatchForm)
  }

  return (
    <div>
      <Button onClick={handleShowAddMatchForm} variant="outline-warning">
          Add match
      </Button>
      <div className="select-group-for-match">
        {showAddMatchForm && (
          <AddKnockoutMatchesFormMain
            rounds={rounds}
            getMatches={getMatches}
            dbKnockoutStages={dbKnockoutStages}
            dbTeams={dbTeams}
            getKnockoutStages={getKnockoutStages}
          />
        )}
      </div>
    </div>
  )
}

export default AddKnockoutMatchMain