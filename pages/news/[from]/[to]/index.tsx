import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Layout } from '@/components/layout'
import { getAllPosts, getAllPostsCount } from '@/lib/api'
import { Post } from '@/lib/types'
import { ContentBox } from '@/components/ui/content-box'
import { SinglePost } from '@/components/ui/single-post'
import { RoundLink } from '@/components/ui/round-link'
import { useRouter } from 'next/router'
import { POSTS_PER_PAGE } from '@/lib/constants'
import useTranslation from 'next-translate/useTranslation'

interface INewsProps {
  posts: Post[]
  from: number
  count: number
}

const News = ({ posts, from, count }: INewsProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const nextFrom = +from + POSTS_PER_PAGE
  const nextTo = nextFrom + POSTS_PER_PAGE

  return (
    <Layout>
      <Head>
        <meta name="og:title" content="Beers" />
      </Head>
      <div>
        {posts &&
          posts.map((post, index) => (
            <div key={index}>
              <SinglePost data={post} />
            </div>
          ))}
      </div>
      <ContentBox>
        {count > POSTS_PER_PAGE && (
          <RoundLink
            href={router.route
              .replace('[from]', String(nextFrom))
              .replace('[to]', String(nextTo))}
            text={t('news:more')}
          />
        )}
      </ContentBox>
    </Layout>
  )
}

const getStaticPaths: GetStaticPaths = async () => {
  const count = await getAllPostsCount()
  const paths = new Array(Math.ceil(count / POSTS_PER_PAGE))

  return {
    paths: paths
      .fill('')
      .map((_, i) => `/news/${i * POSTS_PER_PAGE}/${(i + 1) * POSTS_PER_PAGE}`),
    fallback: true,
  }
}

const getStaticProps: GetStaticProps = async (context) => {
  const { from } = (context.params as Record<string, unknown>) as Record<
    string,
    number | undefined
  >
  const count = await getAllPostsCount()
  const posts = await getAllPosts(context.locale as string, from ?? 0)

  return {
    props: {
      posts,
      from: from ?? 0,
      count,
    },
  }
}

export default News
export { getStaticProps, getStaticPaths }
