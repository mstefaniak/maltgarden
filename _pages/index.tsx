import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Layout } from '@/components/layout'
import { TopBeers } from '@/components/top-beers'
import { PostPreview } from '@/components/post-preview'
import styles from './index.module.scss'
import { PAGE_TITLE } from '@/lib/constants'
import { getAllPostsForHome, getTopBeers } from '@/lib/api'
import { Post, Beer } from '@/lib/types'

interface HomeProps {
  featuredPost: Post
  newPosts: Post[]
  topBeers: Beer[]
}

const Home = ({ newPosts, topBeers }: HomeProps) => {
  const { t } = useTranslation()
  return (
    <Layout isHomePage={true}>
      <TopBeers beers={topBeers} />
      <section className={styles.news} key="news">
        {newPosts.map((post) => (
          <PostPreview post={post} />
        ))}
      </section>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async ({ locale }) => {
  const newPosts = await getAllPostsForHome(locale as string)
  const topBeers = await getTopBeers(locale)

  return {
    props: {
      newPosts,
      topBeers,
    },
  }
}

export default Home
export { getStaticProps }
