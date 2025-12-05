import { useEffect, useRef } from 'react'
import Hero from '../../common/hero/Hero'
import useHeroDetails from '../../common/hero/useHeroDetails'
import ContactForm from './forms/ContactForm'

const Contact = () => {
  const { contact } = useHeroDetails()
  const heroRef = useRef(null)

  useEffect(() => {
    if (heroRef.current) {
      const heroHeight = heroRef.current.offsetHeight
      window.scrollTo({ top: heroHeight, behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <Hero title={contact.title} ref={heroRef} />
      <ContactForm />
    </>
  )
}

export default Contact