import { useEffect, useState } from 'react'
import handleSubmitFormAdmin from '../handleSubmitFormAdmin'
import { useMessageStore } from '../../../../store/slices/useMessageStore'
import { useSubmittingFormStore } from '../../../../store/slices/useSubmittingFormStore'
import { Card, Button, ListGroup, Spinner } from 'react-bootstrap'
import Loading from '../../../common/Loading'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../store/constants/routes'
import { useUserStore } from '../../../../store/slices/useUserStore'

const AdminsListEditable = () => {
  const { addMessage } = useMessageStore()
  const { submittingForm, setSubmittingForm } = useSubmittingFormStore()
  const [adminUsers, setAdminUsers] = useState([])
  const [removedAdmins, setRemovedAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { user } = useUserStore()

  const fetchAllAdminUserDetails = async() => {
    const url = '/admin/users/get-all-admins'
    const httpMethod = 'post'
    setLoading(true)
    try {
      const response = await handleSubmitFormAdmin({ url, addMessage, setSubmittingForm, httpMethod, user })
      if (response?.success) {
        setAdminUsers(response.data?.existingAdminUsers || [])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllAdminUserDetails()
  }, [])

  const markForRemoval = (admin) => {
    setRemovedAdmins([...removedAdmins, admin])
    setAdminUsers(adminUsers.filter(a => a.userId !== admin.userId))
  }

  const cancelRemove = (admin) => {
    setAdminUsers([...adminUsers, admin])
    setRemovedAdmins(removedAdmins.filter(a => a.userId !== admin.userId))
  }

  const confirmChanges = async() => {
    const adminUsersId = removedAdmins.map(user => user.userId) || null

    if (!adminUsersId || adminUsersId.length === 0) {
      addMessage({ type: 'error', content: 'An error ocurred' })
      return
    }

    const values = { adminUsersId }

    await handleSubmitFormAdmin({
      url: '/admin/users/delete-admins',
      values,
      httpMethod: 'post',
      addMessage,
      setSubmittingForm,
      successResponse: 'The admins you have selected have been deleted successfully',
      user
    })

    setRemovedAdmins([])
    fetchAllAdminUserDetails()
  }

  return (
    <div className="site-section bg-light text-white py-5">
      <div className="container">
        <h1 className="text-2xl font-bold">Admins</h1>
        <h5 className="text-lg mt-2">Manage the users with admin permits</h5>

        {/* Bloque de agregar */}
        <div className="d-flex gap-4 mt-4">
          <Card className="flex-fill custom-card">
            <Card.Body>
              <Card.Title>Current admins</Card.Title>
              {loading
                ? (
                  <Loading />
                )
                : (
                  <ListGroup className="admins-card">
                    {adminUsers.length > 0
                      ? adminUsers.map((admin, idx) => (
                        <ListGroup.Item key={admin.emailId || idx} className="d-flex justify-content-between">
                          <span>{admin.email}</span>
                          <Button variant="danger" size="sm" onClick={() => markForRemoval(admin)}>Delete</Button>
                        </ListGroup.Item>
                      ))
                      : (
                        <span className="text-muted">There are not admins yet</span>
                      )}
                  </ListGroup>
                )}
            </Card.Body>
          </Card>
        </div>

        {/* Cambios pendientes */}
        {(removedAdmins.length > 0) && (
          <div className="border p-4 rounded mt-4">
            <div className="d-flex gap-4">
              {removedAdmins.length > 0 && (

                <Card className="flex-fill emails-card removed-emails-card">
                  <Card.Body>
                    <Card.Title>Deleted admins</Card.Title>
                    <ListGroup className="removed-admins-card">
                      {removedAdmins.map((admin, idx) => (
                        <ListGroup.Item key={admin.emailId || idx} className="d-flex justify-content-between">
                          <span>{admin.email}</span>
                          <Button size="sm" variant="warning" onClick={() => cancelRemove(admin)}>Cancel</Button>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              )}
            </div>
            <Button
              className="mt-4"
              variant="warning"
              disabled={submittingForm}
              onClick={confirmChanges}
            >
              Confirm changes
            </Button>
          </div>
        )}
        <Button style={{ marginTop: '50px' }} variant="light" onClick={() => navigate(ROUTES.ADMIN.REGISTER)}>Register new admin</Button>
      </div>
    </div>
  )
}

export default AdminsListEditable