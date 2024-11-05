import patchService from '../../../services/patchService'
import postService from '../../../services/postService'

const handleSubmitFormAdmin = async({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod }) => {
  setSubmittingForm(true)
  const adminCredentials = window.localStorage.getItem('adminCredentials')
  values = { ...values, adminCredentials }
  let response = { success: false }
  if (httpMethod === 'post') {
    response = await postService({ url, values, addMessage, successResponse })
  }
  if (httpMethod === 'patch') {
    response = await patchService({ url, values, addMessage, successResponse })
  }
  setSubmittingForm(false)
  return response
}

export default handleSubmitFormAdmin