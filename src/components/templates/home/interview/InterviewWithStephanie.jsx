import Hero from '../../../common/hero/Hero'
import useHeroDetails from '../../../common/hero/useHeroDetails'

const InterviewWithStephanie = () => {
  const { interview } = useHeroDetails()

  return (
    <>
      <Hero title={interview.title} />
      <div className="intervew-main">
        <p>
          Stephanie Kübler ist nicht nur Spielerin von Futsal Olympique Basel, sondern auch Mitglied des
          Vorstands. Ausserdem spielt die 34-Jährige im Schweizer Gehörlosen-Nationalteam.
          Vor knapp zehn Jahren war sie massgeblich beteiligt an der Gründung der ersten
          Futsal - Meisterschaft für Frauen. Selbstredend war sie auch bei der Organisation des
          Futsal for Her-Junior’s Cup federführend. Hier erzählt sie von ihrer Faszination für den Futsal.
        </p>
        <div className="text-section-with-img">
          <img className="img-left" src="/src/images/interview/Stephi.jpg" alt="Interview" />
          <h5>
            Erinnerst du dich noch, wann du zum ersten Mal mit Futsal in Berührung gekommen bist?
          </h5>
          <p>
            Ja, das war am Landenhof in Unterentfelden (Kanton Aargau), einem Internat für Schwerhörige. Eine
            Mitbewohnerin hatte mich angefragt. Sie spielte beim Gehörlosen Sportclub (GSC) Aarau Futsal. Ich
            war damals 15 und wirklich grottenschlecht, denn ich hatte zuvor nur Tennis gespielt. Trotzdem hat es mich
            sofort gepackt. Fortan nutzte ich jeden Moment, um zu spielen und mich zu verbessern.
          </p>
          <h5>
            Du bist Mitbegründerin des «Futsal Masters», der ersten Futsal-Meisterschaft für Frauen. Wie kam es dazu?
          </h5>
          <p>
            Die Fussballabteilung des GSC Aarau hatte Probleme, genügend Spielerinnen zu finden. Da bot sich der
            Futsal als Alternative an, da dort nur fünf gleichzeitig
            auf dem Platz stehen anstatt elf. Zuerst organisierten wir Vorbereitungsturniere für Futsal-Teams
            im Männerbereich, an denen auch Teams für Hörende teilnahmen. Schnell merkten wir jedoch, dass
            dort bereits ein Angebot besteht. Anders im Frauenbereich. Also starteten wir 2012 mit dem Futsal
            Masters: Zuerst in Turnierform mit Qualifikation und Final, ab 20 16 dann mit einer eigenen
            Meisterschaft. Fast das ganze OK bestand damals aus Gehörlosen, die Turniere und die Meisterschaft
            wurden aber vor allem von Teams mit Hörenden bestritten. Mittlerweile hat der Schweizerische
            Fussballverband die Meisterschaft übernommen.
          </p>
          <h5>
            Was fasziniert dich an Futsal, gerade im Vergleich zum Fussball?
          </h5>
          <p>
            Am meisten Freude machen die vielen Ballkontakte. Stehst du auf dem Platz, bist du ständig in
            Aktionen involviert, offensiv wie defensiv. Du musst mit dem Kopf spielen, wach sein und
            schnell reagieren können.
            Ebenso gefällt mir, dass der Sport sehr taktisch geprägt ist. Ein weiterer Vorzug
            finde ich das Familiäre der Futsal-Szene: Man kennt sich, wenn man sich an den Spieltagen begegnet,
            sagt man sich Hallo und tauscht sich aus, auch wenn man auf dem Feld dann gegeneinander spielt.
          </p>
          <h5>
            Was erhoffst du dir von der erstmaligen Austragung des Juniorinnenturniers FutsalforHer?
          </h5>
          <p>
            Ich erhoffe mir, dass der Bekanntheitsgrad von Futsal in der Region Basel weiter wächst, sodass mehr
            Leute sich für uns ere Sportart interessieren und Zugang finden. Wenn man schon in jungen Jahren
            mit Futsal in Berührung kommt, ist später auch der Anreiz grösser, vielleicht einmal ganz vom Fussball
            zum Futsal zu wechseln. Viele unserer aktuellen Spielerinnen haben zuvor Rasenfussball gespielt,
            bevor sie zu Olympique Basel gewechselt haben. Und wer weiss: Vielleicht können wir eine junge
            Generation von Spielerinnen von Futsal überzeugen, sodass sie einen Weg in unser Team finden.
            Unser aktueller Altersschnitt ist eher hoch, eine Verjüngung würde uns sicher guttun.
          </p>
        </div>
      </div>
    </>
  )
}

export default InterviewWithStephanie