import React from 'react'

const SelectAStage = ({ handleStageChange, dbKnockoutStages }) => {
  return (
    <div>
      <h5>Select a knockout stage to add match</h5>
      <select
        style={{ marginTop: '20px' }}
        className="group-select"
        onChange={(event) => {
          const selectedValue = event.target.value
          const selectedStage = dbKnockoutStages[selectedValue]
          handleStageChange(selectedStage)
        }}
      >
        <option value="">Select a Stage</option>
        {Object.entries(dbKnockoutStages).map(([key, knockoutStage]) => (
          <option key={key} value={key}>
            {knockoutStage.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectAStage