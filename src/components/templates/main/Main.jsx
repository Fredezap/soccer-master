import HeroHomeNoTournament from './HeroHomeNoTournament'
import ModalMain from './modals/ModalMain'
import TournamentList from './TournamentList'

const Main = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.forEach(reg => {
        reg.unregister().then(() => {
          console.log('Service worker removed')
        })
      })
    })
  }

  return (
    <>
      <HeroHomeNoTournament />
      <TournamentList />
      <ModalMain />
    </>
  )
}

export default Main