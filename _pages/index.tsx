import { GetStaticProps } from 'next'
import { ContentBox } from '@/components/ui/content-box'
import { Layout } from '@/components/layout'
import { TopBeers } from '@/components/top-beers'
import { LastBeer } from '@/components/last-beer'
import { PostPreview } from '@/components/post-preview'
import styles from './index.module.scss'
import { getAllPostsForHome, getTopBeers, getLastBeer } from '@/lib/api'
import { Post, Beer } from '@/lib/types'

interface HomeProps {
  featuredPost: Post
  newPosts: Post[]
  topBeers: Beer[]
  lastBeer: Beer
}

const Home = ({ newPosts, topBeers, lastBeer }: HomeProps) => {
  return (
    <Layout isHomePage={true}>
      <ContentBox>
        <TopBeers beers={topBeers} />
      </ContentBox>
      <LastBeer beer={lastBeer} />
      <ContentBox>
        <section className={styles.news} key="news">
          {newPosts.map((post) => (
            <PostPreview post={post} />
          ))}
        </section>
      </ContentBox>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async ({ locale }) => {
  const newPosts = await getAllPostsForHome(locale as string)
  const topBeers = await getTopBeers(locale)
  const lastBeer = await getLastBeer(locale)

  return {
    props: {
      newPosts,
      topBeers,
      lastBeer,
    },
  }
}

export default Home
export { getStaticProps }
