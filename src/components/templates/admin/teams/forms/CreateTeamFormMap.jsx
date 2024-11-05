import PropTypes from 'prop-types'
import Label from '../../../../common/forms-parts/Label'
import { ErrorMessage, Field } from 'formik'
import { Button } from 'react-bootstrap'
import { useTeamStore } from '../../../../../store/slices/useTeamStore'
import { useCustomErrorStore } from '../../../../../store/slices/useCustomErrorStore'

const CreateTeamFormMap = ({ formFields, errors, touched, setFieldValue, values, setErrors }) => {
  const { setTeamName, setNewTeamPlayer } = useTeamStore()
  const { setCustomError } = useCustomErrorStore()

  const handleTeamChange = ({ field, value }) => {
    if (errors[field] || value === '') {
      return
    }
    if (field === 'name') {
      setTeamName(value)
      setCustomError(null)
      values[field] = ''
      setErrors({})
    } else if (field === 'player') {
      setNewTeamPlayer(value)
      values[field] = ''
      setErrors({})
    }
  }

  return (
    <div className="form-columns">
      {formFields.map((data, index) => (
        <div className="form-group" key={index}>
          <Label>{data.label}</Label>
          <div className="input-button">
            <Field
              className="input"
              id={data.id}
              name={data.id}
              autoComplete={data.label}
              placeholder={data.placeholder}
              type={data.type}
              onChange={(e) => setFieldValue(data.id, e.target.value)}
              value={values[data.id]}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleTeamChange({ field: data.id, value: values[data.id] })
                }
              }}
            />
            <Button
              variant= {data.id === 'name' ? 'info' : 'success'}
              onClick={() => handleTeamChange({ field: data.id, value: values[data.id] })}
            >
              {data.id === 'name' ? 'Set' : 'Add'}
            </Button>
          </div>
          {errors[data.id] && touched[data.id] && (
            <ErrorMessage className="form-message error-message" component="div" name={data.id} />
          )}
        </div>
      ))}
    </div>
  )
}

CreateTeamFormMap.propTypes = {
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired
    })
  ).isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired
}

export default CreateTeamFormMap