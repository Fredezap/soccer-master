import ROUTES from '../../../store/constants/routes'
import useCurrentRouteStore from '../../../store/slices/useCurrentRouteStore'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import { forwardRef } from 'react'

const HeroNew = forwardRef(({ title }, ref) => {
  const { currentTournament } = useTournamentsDetails()
  const { current } = useCurrentRouteStore()

  // Solo mostrar detalles si no estamos en estas rutas
  const noNeedDetails = [ROUTES.HOME, ROUTES.INFO, ROUTES.INTERVIEW].includes(current)

  return (
    <div className="hero-new">
      <h1>{title || null}</h1>
      {!noNeedDetails && (
        <h2>{currentTournament?.name}</h2>
      )}
    </div>
  )
})

export default HeroNew