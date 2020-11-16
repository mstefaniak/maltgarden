import Head from 'next/head'
import { Layout } from '@/components/layout'
// import { getAllPostsWithSlug } from '@/lib/api'

const News = () => {

  return (
    <Layout>
      <Head>
        <meta name="og:title" content="Beers" />
      </Head>
      <h2>[NEWS DASHBOARD]</h2>
    </Layout>
  )
}

// const getStaticPaths = async () => {
//   const slugs = await getAllPostsWithSlug()
//   return {
//     paths: slugs,
//     fallback: false
//   }
// }

export default News
// export { getStaticPaths }
