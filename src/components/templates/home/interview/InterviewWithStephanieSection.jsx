import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../store/constants/routes'

const InterviewWithStephanieSection = () => {
  const navigate = useNavigate()

  return (
    <div className="centered-row interview-section">
      <div>
        <img src="/src/images/interview/Stephi.jpg" alt="Interview" />
      </div>
      <div className="centered text-info">
        <h1>
            “Zitat Interview Bla bla bla
            bla bla bla bla bla bla”
        </h1>
        <p>
            Einleitungstext. Ein Interview mit Stephanie Kübler
        </p>
        <button onClick={() => navigate(ROUTES.INTERVIEW)}>
            MEHR LESEN
        </button>
      </div>
    </div>
  )
}

export default InterviewWithStephanieSection