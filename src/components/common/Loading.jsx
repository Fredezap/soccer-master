import { FaSpinner } from 'react-icons/fa6'

const Loading = () => {
  return (
    <div className="loading-box">
      <p>Cargando...</p>
      <div className="loading-icon">
        <FaSpinner />
      </div>
    </div>
  )
}

export default Loading