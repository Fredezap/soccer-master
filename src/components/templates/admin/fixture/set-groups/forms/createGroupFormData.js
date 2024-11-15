import * as Yup from 'yup'

const createGroupFormData = () => {
  const initialValues = {
    name: ''
  }

  const registerSchema = Yup.object().shape({
    name: Yup.string().required('group name can not be empty')
  })

  const formFields = [
    { id: 'name', type: 'text', label: 'Group name', placeholder: 'Choose a group name...' }
  ]

  return { initialValues, registerSchema, formFields }
}

export default createGroupFormData