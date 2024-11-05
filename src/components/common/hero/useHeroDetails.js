const useHeroDetails = () => {
  const players = {
    title: 'Players',
    content: 'Aca va el contenido descriptivo para esta pagina de PLAYERS'
  }

  const matches = {
    title: 'Matches',
    content: 'Aca va el contenido descriptivo para esta pagina de MATCHES'
  }

  const blog = {
    title: 'Blog Posts',
    content: 'Aca va el contenido descriptivo para esta pagina de BLOG'
  }

  const contact = {
    title: 'Contact',
    content: 'Aca va el contenido descriptivo para esta pagina de CONTACT'
  }

  const adminMain = {
    title: 'Admin',
    content: 'Aca va el contenido para ADMIN'
  }

  const adminTournamentDetails = {
    title: 'Admin tournament Details',
    content: 'Aca va el contenido para ADMIN tournament Details'
  }

  const adminTeams = {
    title: 'Admin Teams',
    content: 'Aca va el contenido para ADMIN teams'
  }

  const adminTeamsUpdate = {
    title: 'Admin Teams update',
    content: 'Aca va el contenido para ADMIN teams UPDATE'
  }

  return { players, matches, blog, contact, adminMain, adminTournamentDetails, adminTeams, adminTeamsUpdate }
}

export default useHeroDetails