export const useRegisterFormData = () => {
  const data = [
    { id: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email here...' },
    { id: 'password', type: 'password', label: 'Password', placeholder: 'Enter your password' },
    { id: 'confirmationPassword', type: 'password', label: 'Confirm password', placeholder: 'Enter your password again' }
  ]

  const errors = {
    email_invalid: 'invalid email',
    email_required: 'email is required',
    password_required: 'password is required',
    password_invalid: 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (such as @, $, !, %, *, ?, &).',
    password_min: 'password too short',
    confirmation_password_required: 'confirm password is required',
    confirmation_password_match: 'passwords must match'
  }

  const messages = {
    submitting: 'Creating user, please wait...',
    success: 'User has been created'
  }

  const initialValues = {
    email: '',
    password: '',
    confirmationPassword: ''
  }

  return { data, errors, initialValues, messages }
}