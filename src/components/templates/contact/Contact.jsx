import Hero from '../../common/hero/Hero'
import useHeroDetails from '../../common/hero/useHeroDetails'
import ContactForm from './forms/ContactForm'

const Contact = () => {
  const { contact } = useHeroDetails()
  return (
    <>
      <Hero title={contact.title} />
      <ContactForm />
    </>
  )
}

export default Contact