import { apiInstance } from './apiInstance'

const getService = async(url) => {
  try {
    const response = await apiInstance.get(url)

    if (response.status === 200) {
      return { success: true, data: response.data }
    } else {
      return { success: false, error: response.status }
    }
  } catch (error) {
    return { success: false, error }
  }
}

export default getService