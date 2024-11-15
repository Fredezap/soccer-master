import { useEffect, useState } from 'react'
import BracketComponent from '../brackets/BracketComponent'
import GroupsComponent from '../groups/groupsComponent'
import handleGetData from '../../../handleGetData'
import { useMessageStore } from '../../../../../../store/slices/useMessageStore'

const MatchesMain = ({ stages, matches }) => {
  const { addMessage } = useMessageStore()
  const [groups, setGroups] = useState([])

  // const groups = [
  //   { id: 1, name: 'GROUP A', teams: [{ name: 'team 1' }, { name: 'team 2' }] },
  //   { id: 2, name: 'GROUP B', teams: [{ name: 'team 3' }, { name: 'team 4' }] }
  // ]

  // todo: crear grupos en un punto anterior a esto
  // todo: setear equipos para cada grupo
  // todo: setear partidos para cada grupo? mostrar por ejemplo stage, segun la stage seleccionada mostrar
  // todo: los siguientes datos? siempre se deberia mostrar lugar, hora. Luego por ejemplo que aparezca
  // todo  en equipo A y B opciones si es fase de grupos (ya que deberia haberlo seteado antes, chequear eso)
  // todo: si no es fase de grupos que pueda meter los partidos, con sus datos y le deje poner la descripcion
  // todo: de por ejemplo 1º GROUP "A" VS 2º GROUP "B"
  // todo: despues tengo que ver de dejar actualizar estos datos, por si se equivoca o por si ya llego la fase final
  // todo y necesita setearlos

  const getGroups = async() => {
    const url = '/admin/fixture/groups/get-all'
    const response = await handleGetData({ url, addMessage })
    console.log('response de grupos: ', response)
    if (response.success) { setGroups(response.data.TeamGroup) }
  }

  useEffect(() => {
    getGroups()
  }, [])

  return (
    <div className="matches-main">
      <BracketComponent stages={stages} matches={matches} />
      <GroupsComponent groups={groups}/>
    </div>
  )
}

export default MatchesMain