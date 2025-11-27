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
    <div style={{ marginTop: '20px' }}>
      <Button onClick={handleShowAddMatchForm} variant="outline-warning">
          Add match
      </Button>
      {showAddMatchForm && (
        <div className="select-group-for-match">
          <AddKnockoutMatchesFormMain
            rounds={rounds}
            getMatches={getMatches}
            dbKnockoutStages={dbKnockoutStages}
            dbTeams={dbTeams}
            getKnockoutStages={getKnockoutStages}
          />
        </div>
      )}
    </div>
  )
}

export default AddKnockoutMatchMain