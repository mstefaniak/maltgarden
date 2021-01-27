import { ResponsiveImageType } from 'react-datocms'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { PostBody } from '@/components/post-body'
import { MoreStories } from '@/components/more-stories'
import { PostHeader } from '@/components/post-header'
import { Layout } from '@/components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import Head from 'next/head'
import { markdownToHtml } from '@/lib/markdownToHtml'
import { Post } from '@/lib/types'

interface SinglePostProps {
  post: Post
  morePosts: Post[]
  preview: boolean
}

const SinglePost = ({ post, morePosts, preview }: SinglePostProps) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article>
            <Head>
              <title>{post.heading}</title>
              {/* TODO: <meta property="og:image" content={post.ogImage.url} /> */}
            </Head>
            <PostHeader
              title={post.heading}
              coverImage={post.headingImage}
              date={post.date}
            />
            <PostBody content={post.body} />
          </article>
          <hr />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </>
      )}
    </Layout>
  )
}

const getStaticProps = async ({ params, preview = false }) => {
  const data = await getPostAndMorePosts(params.slug, preview)
  const content = await markdownToHtml(data?.post?.content || '')

  return {
    props: {
      preview,
      post: {
        ...data?.post,
        content,
      },
      morePosts: data?.morePosts ?? [],
    },
  }
}

const getStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  }
}

export default SinglePost
export { getStaticProps, getStaticPaths }
