import { useEffect, useState } from 'react'
import AddKnockoutMatchMain from '../add-matches/AddKnockoutMatchMain'
import Brackets from '../brackets/Brackets'
import formatBracketData from './formatBracketData'
import transformMatches from './transformMatches'

const BracketKnokoutMatches = ({
  dbTeams,
  getMatches,
  dbMatches,
  dbKnockoutStages,
  getKnockoutStages
}) => {
  const [rounds, setRounds] = useState([])

  useEffect(() => {
    const updatedFormattedMatches = transformMatches(dbMatches)
    const updatedRounds = formatBracketData(dbKnockoutStages, updatedFormattedMatches)
    setRounds(updatedRounds)
  }, [dbMatches, dbKnockoutStages])

  // TODO: agregar en admin para parte contacto, si quieren poner contactos o no (Agregar tabla en back)
  // TODO: Ver responsive
  // TODO: Ver seccion de TEAMS que se veia fea.
  // TODO: Ver resto de secciones y mejorar tarjetas torneos, generar imagen
  // TODO: Ver lo que escribi en wpp y lo que me mando deivid para ver si faltaba algo.
  // TODO: Se puede llegar a agregar la diferencia de goles en fase de grupo. Pero seria un laburito de varias horas. VERLO CON DEIV
  return (
    <div className="brackets-component">
      <h2>Tournament Bracket</h2>
      {Object.values(dbKnockoutStages)?.length === 0
        ? (
          <p>Please add knockout stages before adding matches</p>
        )
        : (
          <>
            <AddKnockoutMatchMain
              rounds={rounds}
              getMatches={getMatches}
              dbKnockoutStages={dbKnockoutStages}
              dbTeams={dbTeams}
              getKnockoutStages={getKnockoutStages}
            />
            <Brackets
              rounds={rounds}
              dbTeams={dbTeams}
              getMatches={getMatches}
              getKnockoutStages={getKnockoutStages}
            />
          </>
        )}
    </div>
  )
}

export default BracketKnokoutMatches