function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const backendErrorMessageProcessor = (err) => {
  console.log('err: ', err)
  const errors = err || []
  const genericError = 'An unexpected error ocurred'

  try {
    if (errors.length === 0) {
      return genericError
    }

    const formatedErrors = errors.map((error) => {
      return capitalizeFirstLetter(
        error.msg.toLowerCase().replace(/_/g, ' ')
      )
    })

    const joinedErrors = formatedErrors.join(', ')

    return joinedErrors
  } catch (error) {
    console.log('ERROR EN PROCESSOR: ', error)
    return genericError
  }
}