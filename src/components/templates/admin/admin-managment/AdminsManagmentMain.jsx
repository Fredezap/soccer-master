import Hero from '../../../common/hero/Hero'
import useHeroDetails from '../../../common/hero/useHeroDetails'
import AdminsList from './AdminsList'

const AdminsManagmentMain = () => {
  const { adminUsersManager } = useHeroDetails()

  return (
    <div>
      <Hero title={adminUsersManager.title} />
      <AdminsList />
    </div>
  )
}

export default AdminsManagmentMain