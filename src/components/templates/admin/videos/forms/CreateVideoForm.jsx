import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from 'react-bootstrap'
import Label from '../../../../common/forms-parts/Label'
import useVideoFormData from './useVideoFormData'
import VideoImageUploader from './VideoImageUploader'
import { useState } from 'react'
import handleSubmitFormAdmin from '../../handleSubmitFormAdmin'
import { useMessageStore } from '../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../store/slices/useSubmittingFormStore'
import { useTournamentsDetails } from '../../../../../store/slices/useTournamentsDetails'
import { useVideoStore } from '../../../../../store/slices/useVideoStore'
import { useUserStore } from '../../../../../store/slices/useUserStore'

const CreateVideoForm = () => {
  const { initialValues, registerSchema, formFields } = useVideoFormData()
  const [file, setFile] = useState(null)
  const [customError, setCustomError] = useState(null)
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const { currentTournament } = useTournamentsDetails()
  const { setVideos } = useVideoStore()
  const { user } = useUserStore()
  const [preview, setPreview] = useState(null)

  const HandleImageError = () => {
    if (file === null) {
      setCustomError('Video image is requiered')
    }
    setCustomError(null)
  }

  const createVideo = async(values, { resetForm }) => {
    values = { ...values, tournamentId: currentTournament.tournamentId, file }

    if (file === null) {
      setCustomError('Video image is requiered')
      return
    }

    const successResponse = 'Video has been created'
    const url = '/admin/video/create'
    const httpMethod = 'postForImg'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod, user })

    if (response.success) {
      resetForm()
      setFile(null)
      setPreview(null)
      setVideos(response.data?.dbVideos || null)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={createVideo}
    >
      {() => (
        <Form className="form-columns set-video">
          {formFields.map((data) => (
            <div className="form-group" key={data.id}>
              <Label>{data.label}</Label>
              <Field
                className="input"
                id={data.id}
                name={data.id}
                placeholder={data.placeholder}
                type={data.type}
              />
              <ErrorMessage className="form-message error-message" component="div" name={data.id} />
            </div>
          ))}

          <VideoImageUploader setPreview={setPreview} preview={preview} setFile={setFile} HandleImageError={HandleImageError} />
          {customError && (
            <p className="form-message error-message">{customError}</p>
          )}
          <div className="video-button">
            <Button disabled={submittingForm} type="submit" variant="success">Create video</Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CreateVideoForm