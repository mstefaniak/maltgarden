import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Layout } from '@/components/layout'
import { TopBeers } from '@/components/top-beers'
import { PostPreview } from '@/components/post-preview'
import utilStyles from '@/styles/utils.module.css'
import { PAGE_TITLE } from '@/lib/constants'
import { getAllPostsForHome, getTopBeers } from '@/lib/api'
import { Post, Beer } from '@/lib/types'

interface HomeProps {
  featuredPost: Post
  newPosts: Post[]
  topBeers: Beer[]
}

const Home = ({ featuredPost, newPosts, topBeers }: HomeProps) => {
  const { t } = useTranslation()
  return (
    <Layout isHomePage={true}>
      <TopBeers beers={topBeers} />
      <section
        className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
        key="news"
      >
        <h2 className={utilStyles.headingLg}>Aktualności</h2>
        <PostPreview {...featuredPost} key="featured" />
        {newPosts.map((post) => (
          <PostPreview {...post} />
        ))}
      </section>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { featuredPost, newPosts } = await getAllPostsForHome(locale as string)
  const topBeers = await getTopBeers(locale)

  return {
    props: {
      featuredPost,
      newPosts: newPosts.filter(
        (post: Post) => post.slug !== featuredPost.slug
      ),
      topBeers,
    },
  }
}

export default Home
export { getStaticProps }
