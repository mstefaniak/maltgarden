const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.DATOCMS_API_TOKEN

const locale = 'en'

interface Params {
  variables?: { slug: string | number },
  preview?: boolean,
}

interface AllPostsResponse {
  allPosts: {
    slug: string,
  },
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
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
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

const getAbout = async (preview?: boolean) => {
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

const getPreviewPostBySlug =  async (slug: string | number) => {
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
  return data?.allPosts
}

const getAllPostsForHome = async (preview?: boolean) => {
  const data = await fetchAPI(
    `
    {
      allPosts(orderBy: date_DESC, first: 20) {
        title
        slug
        excerpt
        date
        coverImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
            ...responsiveImageFragment
          }
        }
        author {
          name
          picture {
            url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
          }
        }
      }
    }
    ${responsiveImageFragment}
  `,
    { preview }
  )
  return data?.allPosts
}

const getPostAndMorePosts = async (slug: string | number, preview?: boolean) => {
  const data = await fetchAPI(
    `
  query PostBySlug($slug: String) {
    post(filter: {slug: {eq: $slug}}) {
      title
      slug
      content
      date
      ogImage: coverImage{
        url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
      }
      coverImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
          ...responsiveImageFragment
        }
      }
      author {
        name
        picture {
          url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
        }
      }
    }
    morePosts: allPosts(orderBy: date_DESC, first: 2, filter: {slug: {neq: $slug}}) {
      title
      slug
      excerpt
      date
      coverImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
          ...responsiveImageFragment
        }
      }
      author {
        name
        picture {
          url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
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


export { getAbout, getPreviewPostBySlug, getAllPostsWithSlug, getAllPostsForHome, getPostAndMorePosts }
