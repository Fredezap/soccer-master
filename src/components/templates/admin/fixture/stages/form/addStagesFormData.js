import * as Yup from 'yup'

const addStagesFormData = () => {
  const initialValues = {
    name: '',
    type: '',
    order: ''
  }

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name for the stage is mandatory'),
    type: Yup.string()
      .oneOf(['group', 'knockout'], 'Type must be either "group" or "knockout"')
      .required('Type is mandatory'),
    order: Yup.number()
      .required('Order for the stage is mandatory')
  })

  const formFields = [
    { id: 'name', type: 'text', label: 'Stage name', placeholder: 'Ej: groups, semifinal, etc...' },
    {
      id: 'type',
      type: 'radio',
      label: 'Stage type',
      options: [
        { label: 'Group', value: 'group' },
        { label: 'Knockout', value: 'knockout' }
      ]
    },
    { id: 'order', type: 'number', label: 'Order', placeholder: 'Ej: 1, 2...' }
  ]

  return { initialValues, registerSchema, formFields }
}

export default addStagesFormData