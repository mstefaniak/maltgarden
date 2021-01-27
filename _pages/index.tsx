import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { Layout } from '@/components/layout'
import { PostPreview } from '@/components/post-preview'
import utilStyles from '@/styles/utils.module.css'
import { PAGE_TITLE } from '@/lib/constants'
import { getAllPostsForHome } from '@/lib/api'
import { Post } from '@/lib/types'

interface HomeProps {
  featuredPost: Post
  newPosts: Post[]
}

const Home = ({ featuredPost, newPosts }: HomeProps) => {
  const { t } = useTranslation()
  return (
    <Layout>
      <h1>{PAGE_TITLE}</h1>
      <section className={utilStyles.headingMd} key="slogan">
        <p>{t('common:home_slogan')}</p>
      </section>
      <section
        className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
        key="news"
      >
        <h2 className={utilStyles.headingLg}>Aktualności</h2>
        <PostPreview {...featuredPost} />
        {newPosts.map((post) => (
          <PostPreview {...post} />
        ))}
      </section>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async (context) => {
  const { featuredPost, newPosts } = await getAllPostsForHome(context.locale)

  return {
    props: {
      featuredPost,
      newPosts: newPosts.filter(
        (post: Post) => post.slug !== featuredPost.slug
      ),
    },
  }
}

export default Home
export { getStaticProps }
