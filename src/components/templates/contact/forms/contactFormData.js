import * as Yup from 'yup'

const sendEmailFormData = () => {
  const initialValues = {
    userName: '',
    userEmail: '',
    emailSubject: '',
    emailContent: ''
  }

  const registerSchema = Yup.object().shape({
    userName: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters'),
    userEmail: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    emailSubject: Yup.string()
      .required('Subject is required'),
    emailContent: Yup.string()
      .required('Message is required')
      .max(2000, 'Maximum 1000 characters allowed')
  })

  const formFields = [
    { id: 'userName', type: 'text', placeholder: 'Name' },
    { id: 'userEmail', type: 'text', placeholder: 'Email' },
    { id: 'emailSubject', type: 'text', placeholder: 'Subject' },
    { id: 'emailContent', type: 'textarea', placeholder: 'Write something...' }
  ]

  return { initialValues, registerSchema, formFields }
}

export default sendEmailFormData