// import siteCarousel from './site/siteCarousel'
import siteDatePicker from './site/siteDatePicker'
import siteMenuClone from './site/siteMenuClone'
import siteScroll from './site/siteScroll'
import siteStellar from './site/siteStellar'
import siteCountDownForTournament from './site/siteCountDownForTournament'
import '../../styles/css/index'
import '../../styles/scss/index'
import 'jquery.mb.ytplayer'

const main = function(currentTournament) {
  siteCountDownForTournament(currentTournament)
  siteDatePicker()
  siteMenuClone()
  siteScroll()
  siteStellar()
}

export default main