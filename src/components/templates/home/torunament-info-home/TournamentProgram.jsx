import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../store/constants/routes'

const TournamentProgram = () => {
  const navigate = useNavigate()

  return (
    <div className="centered">
      <div className="infos-img-container form">
        <img
          src="/tournament-rules/TurnierprogrammImg.jpg"
          alt="Tournament Rules"
          className="info-img"
        />
      </div>
      <a className="link-to-challenges" onClick={() => navigate(ROUTES.CHALLENGES)}>Weitere Informationen findest du hier</a>
    </div>
  )
}

export default TournamentProgram