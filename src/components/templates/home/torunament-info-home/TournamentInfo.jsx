import TournamentProgram from './TournamentProgram'

const TournamentInfo = () => {
  return (
    <div className="tournament-info-container">
      <div>
        <div className="main-titles-container">
          <h1 className="title">FUTSAL FOR HER</h1>
          <h2 className="subtitle">JUNIOR'S CUP 2025</h2>
        </div>
        <p>
          Am 13. Dezember 2025 findet unter dem Motto «Futsal for HER» die erste Austragung
          des Junior’s Cup statt; eines Futsal-Turniers für Juniorinnen. Es wird in den Kategorien
          FF-17 (vormittags) und FF-21 (nachmittags) gespielt. <a href="https://www.futsalolympiquebasel.ch/" target="_blank" rel="noopener noreferrer">
          Futsal Olympique Basel</a> ein Verein, der sich seit 17 Jahren im Futsal engagiert und einziger Futsalverein der Region
          NWS, ist Organisator des Turniers.
        </p>
        <p>
          Die dynamische Hallenfussballvariante gewinnt in der Schweiz zunehmend an
          Attraktivität. Das Spiel 5-gegen-5 auf kleinem Feld führt zu vielen Ballkontakten und
          erfordert ein flexibles Positionsspiel, was taktische sowie technische Fertigkeiten
          fördert, die den Spielerinnen auch im Rasenfussball zugutekommen.
        </p>
      </div>
      <div>
        <TournamentProgram />
      </div>
    </div>
  )
}

export default TournamentInfo