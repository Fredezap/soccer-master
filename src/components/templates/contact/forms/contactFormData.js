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
      .required('Name ist erforderlich') // 'Name is required'
      .min(3, 'Name muss mindestens 3 Zeichen lang sein'), // 'Name must be at least 3 characters'
    userEmail: Yup.string()
      .email('Ungültige E-Mail') // 'Invalid email'
      .required('E-Mail ist erforderlich'), // 'Email is required'
    emailSubject: Yup.string()
      .required('Betreff ist erforderlich'), // 'Subject is required'
    emailContent: Yup.string()
      .required('Nachricht ist erforderlich') // 'Message is required'
      .max(2000, 'Maximal 2000 Zeichen erlaubt') // 'Maximum 1000 characters allowed'
  })

  const formFields = [
    { id: 'userName', type: 'text', placeholder: 'Name' }, // 'Name'
    { id: 'userEmail', type: 'text', placeholder: 'E-Mail' }, // 'Email'
    { id: 'emailSubject', type: 'text', placeholder: 'Betreff' }, // 'Subject'
    { id: 'emailContent', type: 'textarea', placeholder: 'Schreibe etwas...' } // 'Write something...'
  ]

  return { initialValues, registerSchema, formFields }
}

export default sendEmailFormData