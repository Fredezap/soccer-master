import HeroHomeNoTournament from './HeroHomeNoTournament'
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
    </>
  )
}

export default Main