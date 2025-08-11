const ROUTES = {
  // BLOG: '/blog',
  CONTACT: '/contact',
  MAIN: '/',
  HOME: '/home',
  MATCHES: '/matches',
  TEAMS: '/teams',
  SINGLE: '/single',
  LOGIN: '/login',
  ADMIN: {
    MAIN: '/admin',
    USERS_MANAGMENT: '/admin/users-managment',
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
    CONTACT: '/admin/contact',
    MATCHES_RESULT_SETTER: '/admin/matches-result-setter',
    REGISTER: '/admin/register'
  }
}

export default ROUTES