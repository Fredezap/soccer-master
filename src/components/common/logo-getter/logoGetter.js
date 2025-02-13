const BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_IMG_DEV_BASE_URL
  : import.meta.env.VITE_IMG_PROD_BASE_URL

const logoGetter = (team, isLocalTeam) => {
  let defaultSrc = 'images/logo_1.png'

  if (!isLocalTeam) defaultSrc = 'images/logo_2.png'

  if (!team || !team.logoUrl) {
    return defaultSrc
  }

  return `${BASE_URL}${team.logoUrl?.trim()}?t=${Date.now()}`
}

export default logoGetter