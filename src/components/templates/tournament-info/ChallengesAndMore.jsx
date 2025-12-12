import { useEffect, useRef } from 'react'
import useHeroDetails from '../../common/hero/useHeroDetails'
import Hero from '../../common/hero/Hero'

const ChallengesAndMore = () => {
  const { challenges } = useHeroDetails()
  const heroRef = useRef(null)

  useEffect(() => {
    if (heroRef.current) {
      const heroHeight = heroRef.current.offsetHeight
      window.scrollTo({ top: heroHeight, behavior: 'smooth' })
    }
  }, [])

  return (
    <div>
      <Hero title={challenges.title} ref={heroRef}/>
      <div className="infos-main">
        <div className="challenge-info">
          <h2>HINTERGRUNDINFORMATIONEN ZU CHALLENGES UND WEITEREN TURNIERSPEZIFISCHEN ELEMENTEN</h2>
          <div>
            <h4>SKILL CHALLENGES:</h4>
            <p>Herausforderung der individuellen Fähigkeiten der Spielerinnen, gemessen an objektiven Kriterien wie Anzahl der Treffer oder Schnelligkeit. Die drei besten Spielerinnen ihrer Alterskategorie können Sachpreise, pro Spielerin, im Wert von 50 CHF gewinnen.</p>
          </div>
          <div>
            <h4>AUSZEICHNUNGEN:</h4>
            <p>Eine Feldspielerin und eine Torhüterin pro Alterskategorie werden durch Abstimmung der ZuschauerInnen zu den Besten gewählt. Sie gewinnen jeweils einen Original Futsal-Ball aus der Women’s Premier League. Ein Team, ausgewählt vom OK des Turniers, gewinnt den Fairplay-Preis basierend auf Anzahl der Fouls, Verwarnungen und Verhalten der Spielerinnen auf und neben dem Platz.</p>
          </div>
          <div>
            <h4>DEMO-SPIEL:</h4>
            <p>Mittags, im Wechsel der Alterskategorien, findet ein Demo-Spiel von etablierten Futsalspielerinnen statt. Dies dient zum einen um ein besseres Verständnis für den Sport zu gewinnen. Zum anderen gewinnt jenes Team, das am lautesten anfeuert und unterstützt einen Preis.</p>
          </div>
          <div>
            <h4>SOCIAL MEDIA:</h4>
            <p>Wie dem Turnierheft zu entnehmen ist, wird pro Alterskategorie eine Gewinnerin ausgewählt, die den besten Social Media Post zum Turnier kreiert hat. Markiere zum Gewinnen @futsalolympiquebasel_offiziell und nutze den hashtag #futsalforher. Der Preis ist eine hochwertige magnetische Powerbank.</p>
          </div>
          <div>
            <h4>TORMUSIK:</h4>
            <p>Ihr dürft euch als Team eine Tormusik auswählen, die immer gespielt wird, wenn ihr einen Treffer erzielt! Schickt dafür bitte bis Freitag, 12. Dezember, um 18 Uhr, einen Youtube Link mit eurem Song an <a href="mailto:stephanie.capomolla@edubs.ch">stephanie.capomolla@edubs.ch</a>. Am besten wählt ihr für den Song einen Ausschnitt, wie bpsw. den Refrain, da wir die Tormusik nur ca. 10 Sekunden spielen können.</p>
          </div>
          <div>
            <h4>WEBSITE:</h4>
            <p>Auf der Website <a href="https://futsalforher.ch" target="_blank">futsalforher.ch</a> sind alle relevanten Informationen hinterlegt. Die Seite wird im Laufe des Turniers live mit Updates, wie bspw. den Ergebnissen, versorgt.</p>
          </div>
          <div>
            <h4>CATERING:</h4>
            <p>Es gibt Hot Dogs, belegte Brötli, Powerriegel und weiteres.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChallengesAndMore