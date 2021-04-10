import Head from 'next/head'
import { GetStaticProps } from 'next'
import { Layout } from '@/components/layout'
import { getAllPosts } from '@/lib/api'
import { Post } from '@/lib/types'
import { ContentBox } from '@/components/ui/content-box'
import { SinglePost } from '@/components/ui/single-post'

interface INewsProps {
  posts: Post[]
}

const News = ({ posts }: INewsProps) => {
  return (
    <Layout>
      <Head>
        <meta name="og:title" content="Beers" />
      </Head>
      <ContentBox>
        {posts.map((post, index) => (
          <div key={index}>
            <SinglePost data={post} />
          </div>
        ))}
      </ContentBox>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getAllPosts(context.locale as string)
  return {
    props: {
      posts,
    },
  }
}

export default News
export { getStaticProps }
