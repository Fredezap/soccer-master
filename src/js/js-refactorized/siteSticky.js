// @ts-ignore
import Sticky from 'sticky-js'

const siteSticky = () => {
  const initSticky = () => {
    const stickyInstance = new Sticky('.js-sticky-header')
    return stickyInstance
  }

  const stickyInstance = initSticky()
  return () => stickyInstance.destroy()
}

export default siteSticky