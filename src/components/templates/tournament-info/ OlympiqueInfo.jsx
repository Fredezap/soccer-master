import { useEffect, useRef } from 'react'
import Hero from '../../common/hero/Hero'
import useHeroDetails from '../../common/hero/useHeroDetails'
import DanielaBorer from '@/images/Olimpic_Basel_Info/Daniela Borer.jpg'
import StephanieCapomolla from '@/images/Olimpic_Basel_Info/Stephanie Capomolla.jpg'
import LeaHinnen from '@/images/Olimpic_Basel_Info/Lea Hinnen.jpg'
import SaraFrrokaj from '@/images/Olimpic_Basel_Info/Sara Frrokaj.jpg'
import StephanieKübler from '@/images/interview/Stephi.jpg'

const OlympiqueInfo = () => {
  const { olympique } = useHeroDetails()
  const heroRef = useRef(null)

  useEffect(() => {
    if (heroRef.current) {
      const heroHeight = heroRef.current.offsetHeight
      window.scrollTo({ top: heroHeight, behavior: 'smooth' })
    }
  }, [])

  return (
    <div>
      <Hero title={olympique.title} ref={heroRef} />

      <div className="infos-main">
        <h1 className="section-title">FUTSAL OLYMPIQUE BASEL</h1>
        <h2 className="section-subtitle">HISTORIE</h2>
        <ul className="section-block">
          <li><strong>01.01.2007:</strong> Offizielle Gründung des Vereins, damals noch unter dem Namen Olympique Basel.</li>
          <li><strong>27.11.2007:</strong> Erstes offizielles Training. Damals gibt es nur ein Männerteam.</li>
          <li><strong>23.11.2008:</strong> Erste Teilnahme am Meisterschaftsbetrieb der damaligen Nationalliga B.
            Das erste Spiel geht mit 0:8 verloren.</li>
          <li><strong>07.06.2016:</strong> Gründung einer Frauenabteilung. An diesem Tag findet das erste Training statt.
            Umbenennung des Vereins in Futsal Olympique Basel. Der Basilisk wird Teil des Logos.</li>
          <li><strong>20.11.2016:</strong> Erste Teilnahme am Meisterschaftsbetrieb der damaligen Futsal Masters Women’s
            League. Das erste Spiel geht mit 1:14 verloren.</li>
          <li><strong>27.01.2019:</strong> Das Männerteam schafft den Aufstieg in die zweithöchste Spielklasse, die heutige Swiss Futsal Second League.</li>
          <li><strong>26.11.2023:</strong> Erste Teilnahme der zweiten Mannschaft am Meisterschaftsbetrieb der 1. Liga regional.
            Das erste Spiel geht mit 0:10 verloren.</li>
          <li><strong>11.02.2024:</strong> Dank einem 3:1-Sieg qualifiziert sich das Frauenteam erstmals
            für die Playoffs. Im Viertelfinal geht das Spiel mit 1:5 verloren.</li>
          <li><strong>01.02.2025:</strong> Dank einem 4:2-Sieg qualifiziert sich das Männerteam erstmals für die Playoffs
            der Second League. Im Viertelfinal geht das Spiel mit 0:3 verloren</li>
          <li><strong>01.03.2025:</strong> Dank dem neuerlichen Erreichen der Playoffs qualifiziert sich das Frauenteam für die
            neugegründete Swiss Futsal Women’s Premier League.</li>
          <li><strong>13.12.2025:</strong> Erste Austragung des Futsal for HER - Junior’s Cup.</li>
        </ul>

        <h2 className="section-subtitle">WICHTIGE FRAUEN IM VEREIN</h2>
        <ul className="important-players-list">
          <li className="important-player">
            <img src={StephanieKübler} alt="Interview" />
            <p className="important-player-text">
              <strong>Stephanie Kübler</strong>, 34: Gründerin des Frauenteams,
      Spielerin der ersten Stunde, Vorstandsmitglied.
            </p>
          </li>
          <li className="important-player">
            <img src={SaraFrrokaj} alt="Interview" />
            <p className="important-player-text">
              <strong>Sara Frrokaj</strong>, 29: Spielerin der ersten Stunde, Rekordtorschützin.
            </p>
          </li>
          <li className="important-player">
            <img src={DanielaBorer} alt="Interview" />
            <p className="important-player-text">
              <strong>Daniela Borer</strong>, 40: Spielerin seit 2019, Vorstandsmitglied.
            </p>
          </li>
          <li className="important-player">
            <img src={LeaHinnen} alt="Interview" />
            <p className="important-player-text">
              <strong>Lea Hinnen</strong>, 32: Spielerin seit 2021, Co-Präsidentin.
            </p>
          </li>
          <li className="important-player">
            <img src={StephanieCapomolla} alt="Interview" />
            <p className="important-player-text">
              <strong>Stephanie Capomolla</strong>, 32: Spielerin seit 2022, Vorstandsmitglied.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default OlympiqueInfo