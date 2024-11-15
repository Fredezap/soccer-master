import StagesTableInfo from './StagesTableInfo'

const StagesData = ({ stages, getStages }) => {
  return (
    <div className="stages-data">
      <h5>Stages</h5>
      <div className="stages-info">
        {stages?.length === 0
          ? (
            <p>No stages have been set yet</p>
          )
          : (
            <StagesTableInfo stages={stages} getStages={getStages} />
          )}
      </div>
    </div>
  )
}

export default StagesData