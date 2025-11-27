import React, { useEffect } from 'react'
import EmailSenderMain from '../email-sender/EmailSenderMain'
import ContactDetailsSetter from '../contact-details/ContactDetailsSetter'
import SideMenu from '../../side-menu/SideMenu'
import useHeroDetails from '../../../../common/hero/useHeroDetails'
import Hero from '../../../../common/hero/Hero'
import FooterContactSetter from '../footer-contact/FooterContactSetter'
import { useTournamentsDetails } from '../../../../../store/slices/useTournamentsDetails'
import getTournaments from '../../../../common/getters/GetTournaments'

const AdminContact = () => {
  const { adminContact } = useHeroDetails()
  const { currentTournament } = useTournamentsDetails()
  const { fetchTournamentDetails } = getTournaments()

  useEffect(() => {
    if (currentTournament && currentTournament.tournamentId) {
      fetchTournamentDetails()
    }
  }, [])

  return (
    <div>
      <SideMenu />
      <Hero title={adminContact.title} />
      <EmailSenderMain />
      <ContactDetailsSetter />
      <FooterContactSetter />
    </div>
  )
}

export default AdminContact