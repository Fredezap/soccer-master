import HeroHomeNoTournament from './HeroHomeNoTournament'
// import ModalMain from './modals/ModalMain'
import TournamentInfo from '../home/torunament-info-home/TournamentInfo'
import TournamentList from './TournamentList'

const Main = () => {
  return (
    <>
      <HeroHomeNoTournament />
      <TournamentInfo />
      <TournamentList />
      {/* <ModalMain /> */}
    </>
  )
}

export default Main