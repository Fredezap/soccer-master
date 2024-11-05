import postService from '../../../services/postService'

const handleGetData = async({ url, addMessage }) => {
  const adminCredentials = window.localStorage.getItem('adminCredentials')
  const values = { adminCredentials }
  return await postService({ url, values, addMessage })
}

export default handleGetData