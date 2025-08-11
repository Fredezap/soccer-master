import postService from '../../../services/postService'
import { useUserStore } from '../../../store/slices/useUserStore'

const handleGetData = async({ paramValues, url, addMessage, user }) => {
  let token = null
  let role = null
  let userId = null

  try {
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