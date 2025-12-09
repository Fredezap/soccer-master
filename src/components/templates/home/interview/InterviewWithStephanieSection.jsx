import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../store/constants/routes'
import InterviewWithStephanieImg from '@/images/interview/Stephi.jpg'

const InterviewWithStephanieSection = () => {
  const navigate = useNavigate()

  return (
    <div className="centered-row interview-section">
      <div>
        <img src={InterviewWithStephanieImg} alt="Interview" />
      </div>
      <div className="centered text-info">
        <h1>
          “Am meisten Freude machen die vielen Ballkontakte. Stehst du auf dem Platz,
          bist du ständig in Aktionen involviert, offensiv wie defensiv. Du musst mit dem Kopf spielen,
          wach sein und schnell reagieren können. Das ist Futsal!”
        </h1>
        <p>
          Stephanie Kübler (34), genannt Stephi, langjährige Spielerin und Vorstandsmitglied von Futsal Olympique Basel,
          Spielerin des Schweizer Gehörlosen-Nationalteams sowie Mitgründerin der ersten Futsal-Liga für Frauen.
          Jetzt das ganze Interview lesen.
        </p>
        <button onClick={() => navigate(ROUTES.INTERVIEW)}>
            MEHR LESEN
        </button>
      </div>
    </div>
  )
}

export default InterviewWithStephanieSection