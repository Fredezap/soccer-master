import postService from '../../../services/postService'

const handleGetData = async({ paramValues, url, addMessage }) => {
  const user = JSON.parse(globalThis.localStorage.getItem('user'))
  const { token, role } = user
  const values = { ...paramValues, token, role }
  return await postService({ url, values, addMessage })
}

export default handleGetData