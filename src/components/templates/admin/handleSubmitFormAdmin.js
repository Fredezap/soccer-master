import patchService from '../../../services/patchService'
import postService from '../../../services/postService'
import postServiceForImg from '../../../services/postServiceForImg'

const handleSubmitFormAdmin = async({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod }) => {
  setSubmittingForm(true)
  const userString = globalThis.localStorage.getItem('user')

  let token = null
  let role = null
  let userId = null

  try {
    const user = JSON.parse(userString)
    token = user.token
    role = user.role
    userId = user.userId
  } catch (error) {}

  let authorizationValues
  if (token && role && userId) authorizationValues = { token, role, userId }

  let response = { success: false }

  if (httpMethod === 'post') {
    response = await postService({ url, values, addMessage, authorizationValues, successResponse })
  }

  if (httpMethod === 'patch') {
    response = await patchService({ url, values, addMessage, authorizationValues, successResponse })
  }

  if (httpMethod === 'postForImg') {
    response = await postServiceForImg({ url, values, addMessage, authorizationValues, successResponse })
  }

  setSubmittingForm(false)
  return response
}

export default handleSubmitFormAdmin