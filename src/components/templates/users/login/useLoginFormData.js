export const useLoginFormData = () => {
  const data = [
    { id: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email here...' },
    { id: 'password', type: 'password', label: 'Password', placeholder: 'Enter the password here...' }
  ]

  const errors = {
    email_invalid: 'invalid email',
    email_required: 'email is required',
    password_required: 'password is required'
  }

  const initialValues = {
    email: '',
    password: ''
  }

  const messages = {
    submitting: 'Loggin in, please wait',
    success: 'Login successfull'
  }

  return { data, errors, initialValues, messages }
}