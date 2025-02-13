import postService from '../../../services/postService'

const handleGetData = async({ paramValues, url, addMessage }) => {
  const userString = globalThis.localStorage.getItem('user')

  let token = null
  let role = null
  try {
    const user = JSON.parse(userString)
    token = user.token
    role = user.role
  } catch (error) {}

  let authorizationValues
  if (token && role) authorizationValues = { token, role }

  const values = { ...paramValues, token, role }
  return await postService({ url, values, addMessage, authorizationValues })
}

export default handleGetData