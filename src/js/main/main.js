import siteCarousel from './site/siteCarousel'
import siteDatePicker from './site/siteDatePicker'
import siteMenuClone from './site/siteMenuClone'
import siteScroll from './site/siteScroll'
import siteStellar from './site/siteStellar'
import siteCountDownForTournament from './site/siteCountDownForTournament'
import siteCountDownForNextMatch from './site/siteCountDownForNextMatch'
import '../../styles/css/index'
import '../../styles/scss/index'

const main = function() {
  siteCarousel()
  siteCountDownForNextMatch()
  siteDatePicker()
  siteMenuClone()
  siteScroll()
  siteStellar()

  // $(function() {
  //   $('#bgndVideo').YTPlayer()
  // })
}

export default main