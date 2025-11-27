import CreateGroupForm from '../forms/CreateGroupForm'

const SetGroupFormMain = ({ selectedStage, groupStages, setSelectedStage, getData }) => {
  return (
    <div className="set-group-form-main">
      <h2>Setting groups</h2>
      {groupStages.length > 0
        ? (
          <select
            onChange={(e) => {
              let selected = ''
              if (e.target.value === '') {
                setSelectedStage(selected)
                return
              }
              selected = JSON.parse(e.target.value)
              setSelectedStage(selected)
            }}
          >
            <option value="">Seleccione una fase</option>
            {groupStages.map((stage) => (
              <option
                key={stage.stageId}
                value={JSON.stringify({ stageId: stage.stageId, name: stage.name })}
              >
                {stage.name}
              </option>
            ))}
          </select>
        )
        : (
          <p>There are not group stages set already. Please set at least one in stages section</p>
        )}
      {selectedStage && (
        <div className="group-selected-stage">
          <p>Stage: {selectedStage.name}</p>
          <CreateGroupForm getData={getData} stageId={selectedStage.stageId} />
        </div>
      )}
    </div>
  )
}

export default SetGroupFormMain