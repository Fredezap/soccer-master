import { backendErrorMessageProcessor } from '../components/common/message-manager/backendErrorMessageProcessor'
import { apiInstance } from './apiInstance'

const patchService = async({ url, values, addMessage, authorizationValues, successResponse }) => {
  const makeAnHttpsPatch = async(url, values) => {
    let error

    try {
      const { token = undefined, role = undefined, userId = undefined } = authorizationValues || {}
      const jsonValues = JSON.stringify(values)
      const response = await apiInstance.patch(url, jsonValues, {
        headers: {
          Authorization: `Bearer ${token}`,
          role,
          userId,
          'Content-Type': 'application/json'
        }
      })

      if (response.status >= 200 && response.status <= 300) {
        return { success: true, data: response?.data ? response.data : null }
      } else {
        error = response?.data?.errors ? response.data.errors : null
        return { success: false, error }
      }
    } catch (err) {
      error = err?.response?.data?.errors ? err.response.data.errors : null
      return { success: false, error }
    }
  }

  const postResponse = await makeAnHttpsPatch(url, values)

  if (postResponse.success) {
    if (successResponse) {
      addMessage(({ type: 'success', content: successResponse }))
    }
    return postResponse
  }

  const proccesedErrors = backendErrorMessageProcessor(postResponse.error)
  addMessage({ type: 'error', content: proccesedErrors })
}

export default patchService