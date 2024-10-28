import postService from '../../../services/postService'

const handleGetData = async({ url, addMessage }) => {
  const adminCredentials = window.localStorage.getItem('adminCredentials')
  const values = { adminCredentials }
  console.log('adminCredentials', values)
  return await postService({ url, values, addMessage })
}

export default handleGetData