import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { PostBody } from '@/components/post-body'
import { MoreStories } from '@/components/more-stories'
import { PostHeader } from '@/components/post-header'
import { Layout } from '@/components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import Head from 'next/head'
import { markdownToHtml } from '@/lib/markdownToHtml'

const Post = async ({ post, morePosts, preview }) => {
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
              <title>{post.title}</title>
              <meta property="og:image" content={post.ogImage.url} />
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
            />
            <PostBody content={post.content} />
          </article>
          <hr />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
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

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  }
}
