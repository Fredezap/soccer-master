import { backendErrorMessageProcessor } from '../components/common/message-manager/backendErrorMessageProcessor'
import { apiInstance } from './apiInstance'

const postService = async({ url, values, addMessage, successResponse }) => {
  const makeAnHttpsPost = async(url, values) => {
    let error
    try {
      const response = await apiInstance.post(url, values, {
        headers: {
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

  const postResponse = await makeAnHttpsPost(url, values)
  if (postResponse.success) {
    if (successResponse) {
      addMessage(({ type: 'success', content: successResponse }))
    }
    return postResponse
  }

  const proccesedErrors = backendErrorMessageProcessor(postResponse.error)
  addMessage({ type: 'error', content: proccesedErrors })
  return postResponse
}

export default postService