const ROUTES = {
  // BLOG: '/blog',
  CONTACT: '/contact',
  MAIN: '/',
  HOME: '/home',
  MATCHES: '/matches',
  TEAMS: '/teams',
  SINGLE: '/single',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: {
    MAIN: '/admin',
    TOURNAMENT_DETAILS_MAIN: '/admin/tournament-details-main',
    TOURNAMENT_DETAILS: '/admin/tournament-details',
    VIDEOS: '/admin/videos',
    TEAMS: {
      MAIN: '/admin/teams',
      UPDATE: '/admin/teams/update'
    },
    FIXTURE: {
      MAIN: '/admin/fixture'
    },
    EMAIL_SENDER: '/admin/email-sender'
  }
}

export default ROUTES