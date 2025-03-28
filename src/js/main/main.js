import siteCarousel from './site/siteCarousel'
import siteDatePicker from './site/siteDatePicker'
import siteMenuClone from './site/siteMenuClone'
import siteScroll from './site/siteScroll'
import siteStellar from './site/siteStellar'
import siteCountDownForTournament from './site/siteCountDownForTournament'
import siteCountDownForNextMatch from './site/siteCountDownForNextMatch'
import '../../styles/css/index'
import '../../styles/scss/index'
import $ from 'jquery'
import 'jquery.mb.ytplayer'
import { Fancybox } from '@fancyapps/ui'

const main = function(currentTournament) {
  siteCarousel()
  siteCountDownForTournament(currentTournament)
  siteDatePicker()
  siteMenuClone()
  siteScroll()
  siteStellar()
}

export default main