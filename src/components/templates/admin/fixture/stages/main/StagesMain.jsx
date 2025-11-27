import StagesData from '../stages-data/StagesData'
import AddStagesForm from '../form/AddStagesForm'

const StagesMain = ({ stages, getStages, getGroups }) => {
  return (
    <div className="stages-main bg-dark">
      <AddStagesForm getStages={getStages} />
      <StagesData stages={stages} getStages={getStages} getGroups={getGroups} />
    </div>
  )
}

export default StagesMain