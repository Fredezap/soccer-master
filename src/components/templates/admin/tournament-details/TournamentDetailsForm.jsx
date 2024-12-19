import { Formik, Form } from 'formik'
import { TournamentDetailsFormMap } from './TournamentDetailsFormMap.jsx'
import { useMessageStore } from '../../../../store/slices/useMessageStore.js'
import { Button } from 'react-bootstrap'
import TournamentDetailsFormData from './TournamentDetailsFormData.js'
import handleSubmitFormAdmin from '../handleSubmitFormAdmin.js'
import { useSubmittingFormStore } from '../../../../store/slices/useSubmittingFormStore.js'
import { useEffect, useState } from 'react'
import handleGetData from '../handleGetData.js'
import formatDate from '../../../common/formatDate.js'
import { useTournamentsDetails } from '../../../../store/slices/useTournamentsDetails.js'

const TournamentDetailsForm = () => {
  const { addMessage } = useMessageStore()
  const { initialValues, registerSchema, formFields } = TournamentDetailsFormData()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const [editTournamentDetails, setEditTournamentDetails] = useState(false)
  let httpMethod
  const { currentTournament, tournaments, updateCurrentTournament } = useTournamentsDetails()

  const handleSubmitFormCreate = async(values) => {
    const successResponse = 'Tournament details has been set'
    const url = '/admin/tournament-details/create'
    httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      updateCurrentTournament(response.data?.tournamentDetails)
    }
  }

  const handleSubmitFormEdit = async(values) => {
    const successResponse = 'Tournament details has been edited'
    const url = '/admin/tournament-details/update'
    httpMethod = 'patch'
    values = { ...values, tournamentId: currentTournament.tournamentId }
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      updateCurrentTournament(response.data.tournamentDetails)
      setEditTournamentDetails(false)
    }
  }

  return (
    <div className="form-main">
      {Object.entries(currentTournament).length > 0 && !editTournamentDetails
        ? (
          <div className="tournament-details">
            <p>
              <span style={{ fontWeight: 'bold' }}>
                Date:
              </span>
              <span style={{ color: 'white' }}>
                {currentTournament.date ? formatDate(currentTournament.date).slashDate : 'No date found'}
              </span>
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>
                Name:
              </span>
              <span style={{ color: 'white' }}>
                {currentTournament.name ? currentTournament.name : 'No name found'}
              </span>
            </p>
            <Button onClick={() => setEditTournamentDetails(true)} variant="secondary">
              Edit
            </Button>
          </div>
        )
        : (
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={!editTournamentDetails ? handleSubmitFormCreate : handleSubmitFormEdit}>
            {({ errors, touched, setFieldValue }) => (
              <Form className="admin-form">
                <TournamentDetailsFormMap
                  formFields={formFields}
                  errors={errors}
                  touched={touched}
                  values={currentTournament}
                  setFieldValue={setFieldValue}
                />
                <div className="form-button">
                  {editTournamentDetails
                    ? (
                      <div>
                        <Button type="submit" variant="primary" disabled={submittingForm}>
                          Edit tournament details
                        </Button>
                        <Button onClick={() => setEditTournamentDetails(false)} variant="secondary" disabled={submittingForm}>
                          Cancel
                        </Button>
                      </div>
                    )
                    : (
                      <div>
                        <Button type="submit" variant="primary" disabled={submittingForm}>
                          {Object.entries(currentTournament).length === 0 ? ('Create tournament') : ('Set tournament details')}
                        </Button>
                      </div>
                    )}
                </div>
              </Form>
            )}
          </Formik>
        )}
    </div>
  )
}

export default TournamentDetailsForm