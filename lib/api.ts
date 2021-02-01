import { CMS_API_URL, CMS_API_TOKEN } from '@/lib/constants'
import { Post } from '@/lib/types'

interface Params {
  variables?: { slug: string | number }
  preview?: boolean
}

const responsiveImageFragment: string = `
  fragment responsiveImageFragment on ResponsiveImage {
  srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`

const fetchAPI = async (query: string, { variables, preview }: Params = {}) => {
  const res = await fetch(CMS_API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CMS_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

const getAbout = async (locale: string, preview?: boolean) => {
  const data = await fetchAPI(
    `
    query About {
      about(locale: ${locale}) {
        title
        paragraph1
        photo {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 600, h: 600}, sizes: "(max-width: 600px) 100vw, 600px") {
            srcSet
            webpSrcSet
            sizes
            src
            width
            height
            aspectRatio
            alt
            title
            bgColor
            base64
          }
        }
        paragraph2
      }
    }
    `,
    { preview }
  )
  return data?.about
}

const getPreviewPostBySlug = async (slug: string | number) => {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String) {
      post(filter: {slug: {eq: $slug}}) {
        slug
      }
    }`,
    {
      preview: true,
      variables: {
        slug,
      },
    }
  )
  return data?.post
}

const getAllPostsWithSlug = async () => {
  const data = await fetchAPI(`
    {
      allPosts {
        slug
      }
    }
  `)
  return data?.allPosts as Post[]
}

const getAllPostsForHome = async (locale: string, preview?: boolean) => {
  const data = await fetchAPI(
    `
    {
      featuredPost: post(locale: ${locale}, orderBy: [featured_DESC, date_DESC]) {
        heading
        slug
        excerpt
        date
        headingImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
            ...responsiveImageFragment
          }
        }
      }
      newPosts: allPosts(locale: ${locale}, orderBy: date_DESC, first: 2) {
        heading
        slug
        excerpt
        date
        headingImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
            ...responsiveImageFragment
          }
        }
      }
    }
    ${responsiveImageFragment}
  `,
    { preview }
  )
  return data
}

const getPostAndMorePosts = async (
  slug: string | number,
  preview?: boolean
) => {
  const data = await fetchAPI(
    `
  query PostBySlug($slug: String) {
    post(filter: {slug: {eq: $slug}}) {
      heading
      slug
      body
      date
      headingImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
          ...responsiveImageFragment
        }
      }
    }
    morePosts: allPosts(orderBy: date_DESC, first: 2, filter: {slug: {neq: $slug}}) {
      heading
      slug
      excerpt
      date
      headingImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
          ...responsiveImageFragment
        }
      }
    }
  }
  ${responsiveImageFragment}
  `,
    {
      preview,
      variables: {
        slug,
      },
    }
  )
  return data
}

export {
  getAbout,
  getPreviewPostBySlug,
  getAllPostsWithSlug,
  getAllPostsForHome,
  getPostAndMorePosts,
}
