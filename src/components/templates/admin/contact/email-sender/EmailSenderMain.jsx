import { useEffect, useState } from 'react'
import { Card, Button, ListGroup } from 'react-bootstrap'
import { useTournamentsDetails } from '../../../../../store/slices/useTournamentsDetails'
import handleSubmitFormAdmin from '../../handleSubmitFormAdmin'
import { useMessageStore } from '../../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../../store/slices/useSubmittingFormStore'
import getTournaments from '../../../../common/getters/GetTournaments'

const EmailSenderMain = () => {
  const { currentTournament } = useTournamentsDetails()
  const [allEmails, setAllEmails] = useState([])
  const [newEmails, setNewEmails] = useState([])
  const [removedEmails, setRemovedEmails] = useState([])
  const [emailInput, setEmailInput] = useState('')
  const [emailError, setEmailError] = useState('')
  const [confirmSelectionError, setConfirmSelectionError] = useState('')
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const { fetchTournamentDetails } = getTournaments()

  useEffect(() => {
    if (currentTournament.Emails) setAllEmails(currentTournament.Emails)
  }, [currentTournament.Emails])

  useEffect(() => {
    setConfirmSelectionError('')
  }, [newEmails, removedEmails])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const addEmail = () => {
    if (emailInput.trim() === '') {
      setEmailError('Email cannot be empty')
      return
    }
    if (!validateEmail(emailInput)) {
      setEmailError('Invalid email format')
      return
    }

    const newEmailObj = { emailId: `new-${Date.now()}`, email: emailInput }
    setNewEmails([...newEmails, newEmailObj])
    setEmailInput('')
    setEmailError('')
  }

  const removeEmail = (removedEmail) => {
    setRemovedEmails([...removedEmails, removedEmail])
    const allEmailsFiltered = allEmails.filter(email => email.emailId !== removedEmail.emailId)
    setAllEmails(allEmailsFiltered)
  }

  const cancelRemoveEmail = (removedEmail) => {
    setAllEmails([...allEmails, removedEmail])
    const removedEmailsFiltered = removedEmails.filter(email => email.emailId !== removedEmail.emailId)
    setRemovedEmails(removedEmailsFiltered)
  }

  const removeNewEmail = (newEmail) => {
    const newEmailsFiltered = newEmails.filter(email => email.emailId !== newEmail.emailId)
    setNewEmails(newEmailsFiltered)
  }
  const c = 0

  const confirmSelection = async() => {
    if (newEmails.length === 0 && removedEmails.length === 0) {
      setConfirmSelectionError('You did not add or remove any email')
      return
    }
    const values = { newEmails, removedEmails, tournamentId: currentTournament.tournamentId }
    const successResponse = 'Emails has been updated'
    const url = '/admin/contact/set-emails'
    const httpMethod = 'post'
    const response = await handleSubmitFormAdmin({ values, url, addMessage, successResponse, setSubmittingForm, httpMethod })
    if (response.success) {
      await fetchTournamentDetails()
      setNewEmails([])
      setRemovedEmails([])
      setConfirmSelectionError('')
      setEmailInput('')
      setEmailError('')
    }
  }

  return (
    <div>
      <div className="site-section bg-dark">
        <div className="container">
          <h1 className="text-2xl font-bold">Email Sender</h1>
          <h5 className="text-lg mt-2">
            Select the users who should receive emails from contact requests.
          </h5>
          <p className="text-sm text-gray-600 mt-1">
            When a user sends an email via the contact section, it will be forwarded to the selected emails below.
          </p>

          <div className="d-flex gap-4 mt-4 email-sender-box">
            <Card className="flex-fill custom-card">
              <Card.Body>
                <Card.Title className="text-light">Add new Email</Card.Title>
                <ListGroup>
                  <ListGroup.Item className="add-email-item d-flex align-items-center gap-2">
                    <input
                      className="input"
                      placeholder="Write new email here..."
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      onKeyDown={(event) => { if (event.key === 'Enter') { addEmail() } }}
                    />
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={addEmail}
                    >
                      Add
                    </Button>
                  </ListGroup.Item>
                  {emailError && <p className="text-danger mt-2">{emailError}</p>}
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="flex-fill custom-card">
              <Card.Body>
                <Card.Title className="text-light">Emails</Card.Title>
                <ListGroup>
                  {allEmails.length === 0
                    ? (
                      <span>
                        No emails has been set yet
                      </span>
                    )
                    : (
                      allEmails.map((email, index) => (
                        <ListGroup.Item key={email.emailId || index} className="d-flex justify-content-between emails-list">
                          <span>
                            {email.email}
                          </span>
                          <Button variant="danger" size="sm" onClick={() => removeEmail(email)}>
                        Remove
                          </Button>
                        </ListGroup.Item>
                      ))
                    )}
                </ListGroup>
              </Card.Body>
            </Card>
          </div>

          {(removedEmails.length > 0 || newEmails.length > 0) && (
            <div className="border  p-4 rounded mt-4">
              <div className="d-flex email-sender-box">
                {newEmails.length > 0 && (
                  <Card className="flex-fill new-emails-card">
                    <Card.Body>
                      <Card.Title className="text-dark">New Emails</Card.Title>
                      <ListGroup>
                        {newEmails.map((email, index) => (
                          <ListGroup.Item key={email.emailId || index} className="d-flex justify-content-between email-card-item">
                            <span>
                              {email.email}
                              <span style={{ color: 'green' }}>{' (New)'}</span>
                            </span>
                            <Button variant="warning" size="sm" onClick={() => removeNewEmail(email)}>
                        Cancel
                            </Button>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                )}

                {removedEmails.length > 0 && (
                  <Card className="flex-fill removed-emails-card">
                    <Card.Body>
                      <Card.Title className="text-dark">Removed Emails</Card.Title>
                      <ListGroup>
                        {removedEmails.map((email, index) => (
                          <ListGroup.Item key={email.emailId || index} className="d-flex justify-content-between email-card-item">
                            <span>
                              {email.email}
                            </span>
                            <Button variant="warning" size="sm" onClick={() => cancelRemoveEmail(email)}>
                            Cancel
                            </Button>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                )}
              </div>
              <Button disabled={submittingForm} className="mt-4" variant="success" onClick={confirmSelection}>
            Confirm Selection
              </Button>
              <p style={{ color: 'red', margin: '10px 0 0 0' }}>{confirmSelectionError}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailSenderMain