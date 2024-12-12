import postService from '../../../services/postService'

const handleGetData = async({ url, addMessage }) => {
  const values = globalThis.localStorage.getItem('user')
  return await postService({ url, values, addMessage })
}

export default handleGetData