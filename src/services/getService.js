import { apiInstance } from './apiInstance'

const getService = async(url) => {
  try {
    const response = await apiInstance.get(url)

    if (response.status === 200) {
      console.log('Data fetched successfully:', response.data)
      return { success: true, data: response.data }
    } else {
      console.error('Unexpected response status:', response.status)
      return { success: false, error: response.status }
    }
  } catch (error) {
    console.error('Error fetching data:', error.message)
    return { success: false, error }
  }
}

export default getService