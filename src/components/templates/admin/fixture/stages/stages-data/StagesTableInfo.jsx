import { MdDeleteForever } from 'react-icons/md'
import DeleteStageModal from '../modals/DeleteStageModal'
import { useState } from 'react'

const StagesTableInfo = ({ stages, getStages, getGroups }) => {
  const [showDeleteStageModal, setShowDeleteStageModal] = useState(false)
  const [stageId, setStageId] = useState(null)

  const handleDeleteStage = (id) => {
    setStageId(id)
    setShowDeleteStageModal(true)
  }

  return (
    <div className="col-lg-12">
      <div className="widget-next-match">
        <table className="table custom-table teams">
          <thead>
            <tr>
              <th>Order</th>
              <th>Name</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stages?.map((stage, index) => (
              <tr className="stage-table-row" key={stage.stageId || index}>
                <td>
                  <strong className="text-white">{stage.order}</strong>
                </td>
                <td>
                  <strong className="text-white">{stage.name}</strong>
                </td>
                <td>
                  <strong className="text-white">{stage.type}</strong>
                </td>
                <td>
                  <div className="delete-icon-stage" onClick={() => handleDeleteStage(stage.stageId)}>
                    <MdDeleteForever />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteStageModal
        showDeleteStageModal={showDeleteStageModal}
        setShowDeleteStageModal={setShowDeleteStageModal}
        stageId={stageId}
        getStages={getStages}
        getGroups={getGroups}
      />
    </div>
  )
}

export default StagesTableInfo