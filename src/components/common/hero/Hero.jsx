import ROUTES from '../../../store/constants/routes'
import useCurrentRouteStore from '../../../store/slices/useCurrentRouteStore'
import { useTournamentsDetails } from '../../../store/slices/useTournamentsDetails'
import { forwardRef } from 'react'

const Hero = forwardRef(({ title }, ref) => {
  const { currentTournament } = useTournamentsDetails()
  const { current } = useCurrentRouteStore()

  // Solo mostrar detalles si no estamos en estas rutas
  const noNeedDetails = [ROUTES.HOME, ROUTES.INFO, ROUTES.INTERVIEW].includes(current)

  return (
    <div className="hero custom-hero-overlay hero-custom-img" ref={ref}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg mx-auto text-center">
            <h1 className="text-futsal-for-her">{title || null}</h1>
            {!noNeedDetails && (
              <h2 style={{ marginTop: '50px' }}>{currentTournament?.name}</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

export default Hero