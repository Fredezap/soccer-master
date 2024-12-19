import patchService from '../../../services/patchService'
import postService from '../../../services/postService'

const handleSubmitFormAdmin = async({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod }) => {
  setSubmittingForm(true)
  const userString = globalThis.localStorage.getItem('user')

  let token = null
  let role = null
  try {
    const user = JSON.parse(userString)
    token = user.token
    role = user.role
  } catch (error) {}

  if (token && role) values = { ...values, token, role }

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