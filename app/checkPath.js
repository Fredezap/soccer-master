import ROUTES from '../src/store/constants/routes'

const checkPath = ({ currentPath, setCurrent, navigate }) => {
  const routeValues = []

  const flattenRoutes = (routesObj) => {
    Object.values(routesObj).forEach(value => {
      if (typeof value === 'object' && value !== null) {
        flattenRoutes(value)
      } else {
        routeValues.push(value)
      }
    })
  }

  flattenRoutes(ROUTES)

  if (!routeValues.includes(currentPath)) {
    setCurrent(ROUTES.HOME)
    navigate(ROUTES.HOME)
    return
  }

  if (currentPath.includes('/admin')) {
    console.log('ES RUTA DE ADMIN')
    // todo: chequear credenciales
  }
  setCurrent(currentPath)
}

export default checkPath