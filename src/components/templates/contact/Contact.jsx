import Hero from '../../common/hero/Hero'
import useHeroDetails from '../../common/hero/useHeroDetails'
import MobileMenu from '../../common/mobile-menu/MobileMenu'
import ContactForm from './ContactForm'

const Contact = () => {
  const { contact } = useHeroDetails()
  return (
    <>
      <Hero title={contact.title} content={contact.content} />
      <ContactForm />
    </>
  )
}

export default Contact