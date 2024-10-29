import { backendErrorMessageProcessor } from '../components/common/message-manager/backendErrorMessageProcessor'
import { apiInstance } from './apiInstance'

const patchService = async({ url, values, addMessage, successResponse }) => {
  const makeAnHttpsPatch = async(url, values) => {
    let error
    try {
      const jsonValues = JSON.stringify(values)
      console.log('JSON VALUES: ', jsonValues)
      console.log('URL: ', url)
      const response = await apiInstance.patch(url, jsonValues, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('RESPONSE EN POST: ', response)
      if (response.status >= 200 && response.status <= 300) {
        console.log('Post successfull:', response.data)
        return { success: true, data: response?.data ? response.data : null }
      } else {
        console.error('Post Unexpected response status:', response)
        error = response?.data?.errors ? response.data.errors : null
        return { success: false, error }
      }
    } catch (err) {
      console.error('Error Posting data:', err)
      error = err?.response?.data?.errors ? err.response.data.errors : null
      return { success: false, error }
    }
  }
  const postResponse = await makeAnHttpsPatch(url, values)
  console.log('successResponse', successResponse)
  if (postResponse.success) {
    if (successResponse) {
      addMessage(({ type: 'success', content: successResponse }))
    }
    return postResponse
  }

  const proccesedErrors = backendErrorMessageProcessor(postResponse.error)
  console.log('proceced: ', proccesedErrors)
  addMessage({ type: 'error', content: proccesedErrors })
}

export default patchService