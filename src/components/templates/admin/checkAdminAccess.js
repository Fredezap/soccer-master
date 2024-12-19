import handleSubmitFormAdmin from './handleSubmitFormAdmin'

const checkAdminAccess = async({ setSubmittingForm, addMessage, values }) => {
  const url = '/admin/validate-access'
  const httpMethod = 'post'
  const response = await handleSubmitFormAdmin({ url, setSubmittingForm, httpMethod, addMessage })
  if (response?.success) {
    return true
  } else {
    return false
  }
}

export default checkAdminAccess