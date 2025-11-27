import handleSubmitFormAdmin from './handleSubmitFormAdmin'

const checkAdminAccess = async({ setSubmittingForm, addMessage, user }) => {
  const url = '/admin/validate-access'
  const httpMethod = 'post'
  const response = await handleSubmitFormAdmin({ url, setSubmittingForm, httpMethod, addMessage, user })
  if (response?.success) {
    return true
  } else {
    return false
  }
}

export default checkAdminAccess