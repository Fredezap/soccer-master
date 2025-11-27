import { backendErrorMessageProcessor } from '../components/common/message-manager/backendErrorMessageProcessor'
import { apiInstance } from './apiInstance'

const postServiceForImg = async({ url, values, addMessage, authorizationValues, successResponse }) => {
  const makeAnHttpsPost = async(url, values) => {
    let error
    const formData = new FormData()

    for (const [key, value] of Object.entries(values)) {
      if (key === 'file') {
        // Puede venir como File directamente o como { file: File }
        if (value instanceof File || value instanceof Blob) {
          formData.append(key, value)
        } else if (value && value.file instanceof File) {
          formData.append(key, value.file)
        }
      } else if (key === 'files') {
        // Puede ser array de Files o array de objetos { file: File }
        if (Array.isArray(value)) {
          value.forEach(item => {
            if (item instanceof File || item instanceof Blob) {
              formData.append(key, item)
            } else if (item && item.file instanceof File) {
              formData.append(key, item.file)
            }
          })
        }
      } else if (Array.isArray(value)) {
        // Array genérico (strings, números, etc)
        formData.append(key, JSON.stringify(value))
      } else if (key !== null && key !== undefined) {
        // Valor escalar
        formData.append(key, value != null ? value.toString() : value)
      }
    }
    const { token = undefined, role = undefined, userId = undefined } = authorizationValues || {}
    try {
      const response = await apiInstance.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          role,
          userId,
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
      addMessage({ type: 'success', content: successResponse })
    }
    return postResponse
  }

  const processedErrors = backendErrorMessageProcessor(postResponse.error)
  addMessage({ type: 'error', content: processedErrors })
  return postResponse
}

export default postServiceForImg

// for (const [key, value] of Object.entries(values)) {
//   if (key === 'logo' && value.file instanceof File) {
//     formData.append('file', value.file)
//   } else if (Array.isArray(value)) {
//     formData.append(key, JSON.stringify(value))
//   } else if (key !== null && key !== undefined) {
//     if (value !== null && value !== undefined) {
//       formData.append(key, value.toString())
//     } else {
//       formData.append(key, value)
//     }
//   }
// }