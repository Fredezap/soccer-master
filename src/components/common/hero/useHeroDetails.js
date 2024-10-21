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

  return { players, matches, blog, contact }
}

export default useHeroDetails