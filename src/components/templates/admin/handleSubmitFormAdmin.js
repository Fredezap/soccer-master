import postService from '../../../services/postService'

const handleSubmitFormAdmin = async({ values, url, addMessage, successResponse, setSubmittingForm }) => {
  setSubmittingForm(true)
  const adminCredentials = window.localStorage.getItem('adminCredentials')
  values = { ...values, adminCredentials }
  const response = await postService({ url, values, addMessage, successResponse })
  setSubmittingForm(false)
  return response
}

export default handleSubmitFormAdmin