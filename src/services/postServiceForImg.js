import { backendErrorMessageProcessor } from '../components/common/message-manager/backendErrorMessageProcessor'
import { apiInstance } from './apiInstance'

const postServiceForImg = async({ url, values, addMessage, authorizationValues, successResponse }) => {
  const makeAnHttpsPost = async(url, values) => {
    let error
    const formData = new FormData()

    for (const [key, value] of Object.entries(values)) {
      console.log('KEY:', key)
      console.log('value:', value)
      if (key === 'logo' && value.file instanceof File) {
        console.log('ES LOGO, EL VALUE: ', value.file)
        formData.append('file', value.file)
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value))
      } else if (key !== null && key !== undefined) {
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString())
        } else {
          formData.append(key, value)
        }
      }
    }

    const { token = undefined, role = undefined } = authorizationValues || {}
    console.log('formData', formData)
    try {
      const response = await apiInstance.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          role,
          'Content-Type': 'multipart/form-data'
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

export default postServiceForImg