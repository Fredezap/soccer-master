import { useState } from 'react'
import PropTypes from 'prop-types'
import Label from '../../../common/forms-parts/Label'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import TournamentImageUploader from './TournamentImageUploader'
import { useTournamentsDetails } from '../../../../store/slices/useTournamentsDetails'

const BASE_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_IMG_DEV_BASE_URL
  : import.meta.env.VITE_IMG_PROD_BASE_URL

export const TournamentDetailsFormMap = ({ formFields, errors, touched, setFiles }) => {
  const { currentTournament } = useTournamentsDetails()
  const [editMode, setEditMode] = useState({})
  const { setFieldValue } = useFormikContext()

  const enterEditMode = (fieldId) => {
    setFiles(prev => prev.filter(item => item.id !== fieldId))
    setFieldValue(fieldId, '')
    setEditMode((prev) => ({ ...prev, [fieldId]: true }))
  }

  return (
    <div className="form-columns">
      {formFields.map((data, index) => {
        const currentImage = currentTournament[data.id]

        return (
          <div className="form-group" key={index}>
            <Label>{data.label}AAAAAAAAAAAAAAA</Label>
            {data.type === 'image'
              ? (
                currentImage && !editMode[data.id]
                  ? (
                    <>
                      <div className="img-section">
                        <img
                          src={`${BASE_URL}${currentImage}`}
                          alt={data.label}
                          style={{ maxWidth: '100%', height: 'auto', marginBottom: '1rem' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => enterEditMode(data.id)}
                        >
                      Eliminar
                        </button>
                      </div>
                    </>
                  )
                  : (
                    <TournamentImageUploader
                      name={data.id}
                      label={data.label}
                      setFiles={setFiles}
                    />
                  )
              )
              : (
                <>
                  <Field
                    className="input"
                    id={data.id}
                    name={data.id}
                    autoComplete={data.label}
                    placeholder={data.placeholder}
                    type={data.type}
                  />
                  {errors[data.id] && touched[data.id] && (
                    <ErrorMessage
                      className="form-message error-message"
                      component="div"
                      name={data.id}
                    />
                  )}
                </>
              )}
          </div>
        )
      })}
    </div>
  )
}

TournamentDetailsFormMap.propTypes = {
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string
    })
  ).isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  setFiles: PropTypes.func.isRequired
}