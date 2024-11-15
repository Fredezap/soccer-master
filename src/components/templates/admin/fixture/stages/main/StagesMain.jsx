import StagesData from '../stages-data/StagesData'
import AddStagesForm from '../form/AddStagesForm'

const StagesMain = ({ stages, getStages }) => {
  return (
    <div className="stages-main">
      <AddStagesForm getStages={getStages}/>
      <StagesData stages={stages} getStages={getStages} />
    </div>
  )
}

export default StagesMain