import { useCallback, useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { PostBody } from '@/components/post-body'
import { MoreStories } from '@/components/more-stories'
import { PostHeader } from '@/components/post-header'
import { Layout } from '@/components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import Head from 'next/head'
import { markdownToHtml } from '@/lib/markdownToHtml'
import { Post, ISlug } from '@/lib/types'
import { parseSlugsList } from '@/lib/helpers'
import { Meta } from '@/components/meta'

interface SinglePostProps {
  post: Post
  morePosts: Post[]
  preview: boolean
}

const SinglePost = ({ post, morePosts, preview }: SinglePostProps) => {
  const router = useRouter()
  const [parsedContent, setParsedContent] = useState<string>()

  const parseContent = useCallback(async () => {
    if (post) {
      const parsedMarkdown = await markdownToHtml(post.body)
      setParsedContent(parsedMarkdown)
    }
  }, [post])

  useEffect(() => {
    parseContent()
  }, [parseContent])

  if (!parsedContent) {
    return null
  }

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
            <Meta
              title={post?.seoDescription?.title ?? post.heading}
              imageUrl={post?.headingImage?.responsiveImage?.src}
              description={post?.seoDescription?.description}
            />
            <PostHeader
              title={post.heading}
              coverImage={post.headingImage}
              date={post.date}
            />
            <PostBody content={parsedContent} />
          </article>
          <hr />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </>
      )}
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  preview = false,
}) => {
  const data = await getPostAndMorePosts(
    params?.slug as string,
    locale,
    preview
  )
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

const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()
  const paths = parseSlugsList(allPosts)

  return {
    paths,
    fallback: true,
  }
}

export default SinglePost
export { getStaticProps, getStaticPaths }
