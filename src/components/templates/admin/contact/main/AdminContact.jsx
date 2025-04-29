import React from 'react'
import EmailSenderMain from '../email-sender/EmailSenderMain'
import ContactDetailsSetter from '../contact-details/ContactDetailsSetter'
import SideMenu from '../../side-menu/SideMenu'
import useHeroDetails from '../../../../common/hero/useHeroDetails'
import Hero from '../../../../common/hero/Hero'

const AdminContact = () => {
  const { adminContact } = useHeroDetails()
  return (
    <div>
      <SideMenu />
      <Hero title={adminContact.title} />
      <EmailSenderMain />
      <ContactDetailsSetter />
    </div>
  )
}

export default AdminContact