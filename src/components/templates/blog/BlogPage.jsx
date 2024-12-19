import Hero from '../../common/hero/Hero'
import useHeroDetails from '../../common/hero/useHeroDetails'
import MobileMenu from '../../common/mobile-menu/MobileMenu'
import BlogGrid from './BlogGrid'

const BlogPage = () => {
  const { blog } = useHeroDetails()
  return (
    <>
      <Hero title={blog.title} />
      <BlogGrid />

    </>
  )
}

export default BlogPage