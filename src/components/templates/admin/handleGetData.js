import postService from '../../../services/postService'

const handleGetData = async({ paramValues, url, addMessage }) => {
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

  const values = { ...paramValues, token, role, userId }
  return await postService({ url, values, addMessage, authorizationValues })
}

export default handleGetData