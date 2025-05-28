import * as Yup from 'yup'
import TOURNAMENT_DETAILS from '../../../../store/constants/tournamentDetails'

const isImage = (value) => {
  const imageMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/tiff',
    'image/webp',
    'image/x-icon',
    'image/heic',
    'image/avif'
  ]

  return imageMimeTypes.includes(value?.type)
}

const TournamentDetailsFormData = () => {
  const { MIN_NAME_LENGTH, MAX_NAME_LENGTH, MIN_DATE_VALUE } = TOURNAMENT_DETAILS

  const initialValues = {
    name: '',
    date: '',
    tournamentLogo: '',
    mainBgImg: ''
  }

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .optional()
      .min(MIN_NAME_LENGTH, `Name must be at least ${MIN_NAME_LENGTH} characters long`)
      .max(MAX_NAME_LENGTH, `Name must be at most ${MAX_NAME_LENGTH} characters long`),

    date: Yup.date()
      .required('Date is mandatory')
      .min(MIN_DATE_VALUE, 'Date must be future')

    // tournamentLogo: Yup.mixed()
    //   .nullable()
    //   .test('fileType', 'Only image files are allowed', (value) => {
    //     if (!value) return true
    //     return isImage(value)
    //   })
    //   .test('fileSize', 'Image too large (max 2MB)', (value) => {
    //     if (!value) return true
    //     return value.size <= 2 * 1024 * 1024
    //   }),

    // mainBgImg: Yup.mixed()
    //   .nullable()
    //   .test('fileType', 'Only image files are allowed', (value) => {
    //     if (!value) return true
    //     return isImage(value)
    //   })
    //   .test('fileSize', 'Image too large (max 5MB)', (value) => {
    //     if (!value) return true
    //     return value.size <= 5 * 1024 * 1024
    //   })
  })

  const formFields = [
    { id: 'name', type: 'text', label: 'Tournament name', placeholder: 'Tournament name here...' },
    { id: 'date', type: 'date', label: 'Starting date', placeholder: 'Tournament date here...' },
    { id: 'tournamentLogo', type: 'image', label: 'Tournament Logo' },
    { id: 'mainBgImg', type: 'image', label: 'Main Background' }
  ]

  return { initialValues, registerSchema, formFields }
}

export default TournamentDetailsFormData