const ROUTES = {
  BLOG: '/blog',
  CONTACT: '/contact',
  MAIN: '/main',
  HOME: '/',
  MATCHES: '/matches',
  PLAYERS: '/players',
  SINGLE: '/single',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: {
    MAIN: '/admin',
    TOURNAMENT_DETAILS: '/admin/tournament-details',
    TEAMS: {
      MAIN: '/admin/teams',
      UPDATE: '/admin/teams/update'
    },
    FIXTURE: {
      MAIN: '/admin/fixture'
    }
  }
}

export default ROUTES