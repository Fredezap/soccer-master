import * as Yup from 'yup'
import VIDEO_CONSTANTS from '../../../../../store/constants/videoConstants'

const useVideoFormData = () => {
  const { VIDEO_URL_IS_REQUIRED, VIDEO_TITLE_IS_REQUIERED } = VIDEO_CONSTANTS
  const initialValues = {
    title: '',
    videoUrl: ''
  }

  const registerSchema = Yup.object().shape({
    title: Yup.string()
      .required(VIDEO_TITLE_IS_REQUIERED),
    videoUrl: Yup.string()
      .required(VIDEO_URL_IS_REQUIRED)

  })

  const formFields = [
    { id: 'title', type: 'text', label: 'Title', placeholder: 'Choose a video title...' },
    { id: 'videoUrl', type: 'text', label: 'Url', placeholder: 'Set the url...' }
  ]

  return { initialValues, registerSchema, formFields }
}

export default useVideoFormData