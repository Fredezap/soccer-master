import { useEffect, useState } from 'react'
import BracketKnokoutMatches from '../brackets-matches/BracketKnokoutMatches'
import GroupsMatches from '../groups-matches/GroupsMatches'
import handleGetData from '../../../handleGetData'
import { useMessageStore } from '../../../../../../store/slices/useMessageStore'
import handleSubmitFormAdmin from '../../../handleSubmitFormAdmin'
import { useSubmittingFormStore } from '../../../../../../store/slices/useSubmittingFormStore'

const MatchesMain = ({ getStages }) => {
  const { addMessage } = useMessageStore()
  // const [groups, setGroups] = useState([])
  const [dbGroups, setDbGroups] = useState([])
  const { setSubmittingForm } = useSubmittingFormStore()

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

  const getGroups = async(values) => {
    const url = '/admin/fixture/groups/get-all'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, setSubmittingForm, httpMethod, addMessage })

    if (response?.success) {
      setDbGroups(response.data.dbGroups)
    }
  }

  useEffect(() => {
    getGroups()
  }, [])

  return (
    <div className="matches-main">
      <BracketKnokoutMatches />
      <GroupsMatches getStages={getStages} dbGroups={dbGroups} getGroups={getGroups} />
    </div>
  )
}

export default MatchesMain